import React, { FC, useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { useHistory } from 'react-router-dom';

import TitleSection from '../../components/TitleSection/TitleSection';
import CardUser from '../../components/CardUser/CardUser';
import CardIssueGame from '../../components/CardIssueGame/CardIssueGame';
import CardGame from '../../components/CardGame/CardGame';
import ChatToVoteOnIssue from '../../components/ChatToVoteOnIssue/ChatToVoteOnIssue';
import ChatOpenButton from '../../components/ChatOpenButton/ChatOpenButton';
import IssueChatUserCard from '../../components/IssueChatUserCard/IssueChatUserCard';
import StatisticsCard from '../../components/StatisticsCard/StatisticsCard';
import RunRoundButton from '../../components/RunRoundButton/RunRoundButton';
import StopRoundButton from '../../components/StopRoundButton/StopRoundButton';
import ShowResultsButton from '../../components/ShowResultsButton/ShowResultsButton';
import IsLateModal from '../../components/IsLateModal/IsLateModal';

import { selectGameCards } from '../../redux/slices/gameCardsSlice';
import { selectGameSetting } from '../../redux/slices/gameSettingSlice';
import {
  initIssueChat,
  initStatisticsCards,
  isLateModalOpenSlice,
  isPlayingNowSlice,
  isShowResultOfVotingSlice,
  issueIdSelectedSlice,
  selectedIssue,
  setIsLateModalOpen,
  setIsPlayingNow,
  setIsShowResultOfVoting,
  setLateUser,
  statisticsCardsSlice,
  updateIssueChatAndStatistics,
} from '../../redux/slices/gameProcessSlice';
import { selectIssues } from '../../redux/slices/issuesSlice';
import {
  adminSlice,
  allUsersSlice,
  currentRoomSlice,
  currentUserSlice,
  isAdminSlice,
  updateMembers,
} from '../../redux/slices/roomSlice';
import { initStatistics } from '../../redux/slices/statisticsSlice';
import { SocketContext } from '../../socketContext';
import { COUNT_MILLISECONDS_IN_SECOND } from '../../constants';
import { Member, ResponseFromSocket } from '../../types/common';
import exitToMainPage from '../../utils/exit';

import styles from './GamePage.module.scss';

const GamePage: FC = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const socket = useContext<Socket<DefaultEventsMap, DefaultEventsMap>>(SocketContext);

  const room = useSelector(currentRoomSlice);
  const users = useSelector(allUsersSlice);
  const admin = useSelector(adminSlice);
  const isAdmin = useSelector(isAdminSlice);
  const issues = useSelector(selectIssues);
  const cards = useSelector(selectGameCards);
  const statisticsCards = useSelector(statisticsCardsSlice);
  const settings = useSelector(selectGameSetting);
  const isPlayingNow = useSelector(isPlayingNowSlice);
  const issueIdSelected = useSelector(issueIdSelectedSlice);
  const isShowResultOfVoting = useSelector(isShowResultOfVotingSlice);
  const isLateModalOpen = useSelector(isLateModalOpenSlice);
  const currentUser = useSelector(currentUserSlice);

  const [isVisibleChat, setIsVisibleChat] = useState(false);
  const [currentRoundTime, setCurrentRoundTime] = useState(settings.roundTime);

  const issueSelected = issues[Number(issueIdSelected)];
  const isNeedTimer = settings.isNeededTimer;
  const isAdminAsPlayer = settings.masterIsPlayer;

  useEffect(() => {
    if (!admin.firstName) {
      history.push('/');
      exitToMainPage();
    }
  });

  useEffect(() => {
    const isAdminPlayer = settings.masterIsPlayer;
    const payload = { isAdminPlayer, admin, users };
    dispatch(initIssueChat(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  useEffect(() => {
    const updateUsersSuccess = (response: Member): void => {
      if (response.userId !== currentUser.userId) {
        // eslint-disable-next-line no-console
        console.log('admin-added-later-in-game', response);

        dispatch(updateMembers(response));
      }
    };

    socket.on('admin-added-later-in-game', updateUsersSuccess);

    return (): void => {
      socket.off('admin-added-later-in-game', updateUsersSuccess);
    };
  });

  useEffect(() => {
    const updateSelectedIssueIdSuccess = (response: string): void => {
      // eslint-disable-next-line no-console
      console.log('round-is-starting', response);

      if (!isAdmin) dispatch(selectedIssue(response));
      const isAdminPlayer = settings.masterIsPlayer;
      const payload = { isAdminPlayer, admin, users };
      dispatch(initIssueChat(payload));
      dispatch(setIsPlayingNow(true));
      dispatch(setIsShowResultOfVoting(false));
      dispatch(initStatisticsCards(cards));
    };

    socket.on('round-is-starting', updateSelectedIssueIdSuccess);

    return (): void => {
      socket.off('round-is-starting', updateSelectedIssueIdSuccess);
    };
  });

  useEffect(() => {
    const updateIssuesChatAndStatisticsSuccess = (response: ResponseFromSocket): void => {
      // eslint-disable-next-line no-console
      console.log(response);
      const { eventName, code, error: responseError, data } = response;

      // eslint-disable-next-line no-console
      if (responseError) console.log(`${eventName}: ${code}: ${responseError}`);
      else {
        const { vote: responseVote } = data;
        dispatch(updateIssueChatAndStatistics(responseVote));
      }
    };

    socket.on('update-voting-results', updateIssuesChatAndStatisticsSuccess);

    return (): void => {
      socket.off('update-voting-results', updateIssuesChatAndStatisticsSuccess);
    };
  });

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isPlayingNow && isNeedTimer) {
      const timer = setTimeout(() => {
        dispatch(setIsPlayingNow(false));
        dispatch(setIsShowResultOfVoting(true));
      }, settings.roundTime * COUNT_MILLISECONDS_IN_SECOND);

      return (): void => {
        clearTimeout(timer);
      };
    }
  }, [dispatch, isNeedTimer, isPlayingNow, settings.roundTime]);

  useEffect(() => {
    const setLateUserSuccess = (response: ResponseFromSocket): void => {
      if (isAdmin) {
        // eslint-disable-next-line no-console
        console.log(response);
        const { eventName, code, error: responseError, data } = response;

        // eslint-disable-next-line no-console
        if (responseError) console.log(`${eventName}: ${code}: ${responseError}`);
        else {
          const { user: responseUser } = data;
          dispatch(setLateUser(responseUser));
          dispatch(setIsLateModalOpen(true));
        }
      }
    };

    socket.on('late-user-logged-in', setLateUserSuccess);

    return (): void => {
      socket.off('late-user-logged-in', setLateUserSuccess);
    };
  });

  useEffect(() => {
    const stopRoundSuccess = (response: string): void => {
      // eslint-disable-next-line no-console
      console.log('round-is-stoping', response);
      dispatch(setIsPlayingNow(false));
      dispatch(setIsShowResultOfVoting(true));
    };

    socket.on('round-is-stoping', stopRoundSuccess);

    return (): void => {
      socket.off('round-is-stoping', stopRoundSuccess);
    };
  });

  useEffect(() => {
    const setStatisticsSuccess = (response: ResponseFromSocket): void => {
      // eslint-disable-next-line no-console
      console.log(response);
      const { eventName, code, error: responseError, data } = response;

      // eslint-disable-next-line no-console
      if (responseError) console.log(`${eventName}: ${code}: ${responseError}`);
      else {
        const { statistics: responseStatistics } = data;
        dispatch(initStatistics({ responseStatistics, issues, storyType: settings.storyType }));
        history.push('/result');
      }
    };

    socket.on('get-statistics', setStatisticsSuccess);

    return (): void => {
      socket.off('get-statistics', setStatisticsSuccess);
    };
  });

  useEffect(() => {
    if (isShowResultOfVoting && isAdmin) {
      const callback = (response: ResponseFromSocket): void => {
        // eslint-disable-next-line no-console
        console.log('send-statistics', response);

        const { eventName, code, error: responseError } = response;

        // eslint-disable-next-line no-console
        if (responseError) console.log(`${eventName}: ${code}: ${responseError}`);
      };

      socket.emit('send-statistics', room, issueIdSelected, statisticsCards, callback);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowResultOfVoting]);

  useEffect(() => {
    if (isPlayingNow && currentRoundTime > 0) setTimeout(() => setCurrentRoundTime(currentRoundTime - 1), 1000);
    else {
      setIsPlayingNow(false);
      setCurrentRoundTime(settings.roundTime);
    }
  }, [currentRoundTime, isPlayingNow, settings.roundTime]);

  return (
    <div className={styles.game_wrap}>
      <div className={styles.game_container}>
        <TitleSection
          title={`Planning (issues: ${issues
            .map((is) => is.title)
            .filter((is, id) => id < 4)
            .join(', ')}${issues.length > 5 ? ', ...' : ''})`}
          isCapitalLetters
        />
        <div className={styles.game_content}>
          <div className={styles.game_issueBar}>
            <p>Scram master:</p>
            <CardUser userId={admin.userId} firstName={admin.firstName} lastName={admin.lastName} role={admin.role} />
            <TitleSection title={'issues:'} />
            {issues.length > 0 && issues.map((item) => <CardIssueGame key={item.id} id={item.id} title={item.title} />)}
          </div>
          <div className={styles.game_body}>
            {issueSelected && (
              <>
                <TitleSection title={issueSelected.title} />
                <div className={styles.game_desc}>{issueSelected.desc}</div>
                <div className={styles.game_buttons}>
                  {isAdmin && !isPlayingNow && <RunRoundButton />}
                  {isAdmin && isPlayingNow && <StopRoundButton />}
                  {isAdmin && <ShowResultsButton />}
                </div>
                {isNeedTimer && (
                  <div className={styles.game_timer}>
                    <span>{`${Math.floor(currentRoundTime / 60)}:${
                      currentRoundTime % 60 < 10 ? `0${(currentRoundTime % 60).toString()}` : currentRoundTime % 60
                    }`}</span>
                  </div>
                )}
                {isAdmin && isAdminAsPlayer && (
                  <>
                    <TitleSection title={'please, make your choise:'} />
                    <div className={styles.game_cards}>
                      {cards && cards.map((card) => <CardGame key={card.id} card={card} />)}
                    </div>
                  </>
                )}
                {!isAdmin && (
                  <>
                    <TitleSection title={'please, make your choise:'} />
                    <div className={styles.game_cards}>
                      {cards && cards.map((card) => <CardGame key={card.id} card={card} />)}
                    </div>
                  </>
                )}
                <TitleSection title={'statistics:'} />
                <div className={styles.game_stat_card}>
                  {statisticsCards.some((card) => card.scoreInPercent > 0) ? (
                    statisticsCards.map(
                      (card) => card.scoreInPercent > 0 && <StatisticsCard key={card.id} card={card} />,
                    )
                  ) : (
                    <p>Statistics will be displayed here</p>
                  )}
                </div>
                <TitleSection title={'members:'} />
                <div className={styles.game_users}>
                  <div className={styles.game_user_wrapper}>
                    <IssueChatUserCard
                      userId={admin.userId}
                      firstName={admin.firstName}
                      lastName={admin.lastName}
                      role={admin.role}
                      job={admin.job}
                    />
                  </div>
                  {users.map((user: Member) => (
                    <div key={user.userId} className={styles.game_user_wrapper}>
                      <IssueChatUserCard
                        userId={user.userId}
                        firstName={user.firstName}
                        lastName={user.lastName}
                        role={user.role}
                        job={user.job}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <ChatOpenButton isVisible={isVisibleChat} setIsVisible={setIsVisibleChat} />
          {isVisibleChat && <ChatToVoteOnIssue isVisible={isVisibleChat} setIsVisible={setIsVisibleChat} />}
        </div>
      </div>
      {isLateModalOpen && <IsLateModal />}
    </div>
  );
};

export default GamePage;
