import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import TitleSection from '../../components/TitleSection/TitleSection';
import CardUser from '../../components/CardUser/CardUser';
import CardIssueGame from '../../components/CardIssueGame/CardIssueGame';
import CardGame from '../../components/CardGame/CardGame';
import ChatToVoteOnIssue from '../../components/ChatToVoteOnIssue/ChatToVoteOnIssue';
import { selectGameCards } from '../../redux/slices/gameCardsSlice';
import { selectGameSetting } from '../../redux/slices/gameSettingSlice';
import {
  initIssueChat,
  initStatisticsCards,
  issueIdSelectedSlice,
  selectedIssue,
  setIsPlayingNow,
  setIsShowResultOfVoting,
  statisticsCardsSlice,
  updateIssueChat,
} from '../../redux/slices/gameProcessSlice';
import { selectIssues } from '../../redux/slices/issuesSlice';
import { adminSlice, allUsersSlice, isAdminSlice } from '../../redux/slices/roomSlice';
import { SocketContext } from '../../socketContext';
import { Member, ResponseFromSocket } from '../../types/common';
import IssueChatUserCard from '../../components/IssueChatUserCard/IssueChatUserCard';

import styles from './GamePage.module.scss';
import StatisticsCard from '../../components/StatisticsCard/StatisticsCard';
import RunRoundButton from '../../components/RunRoundButton/RunRoundButton';

const GamePage: FC = () => {
  const dispatch = useDispatch();

  const socket = React.useContext<Socket<DefaultEventsMap, DefaultEventsMap>>(SocketContext);

  const users = useSelector(allUsersSlice);
  const admin = useSelector(adminSlice);
  const isAdmin = useSelector(isAdminSlice);
  const issues = useSelector(selectIssues);
  const cards = useSelector(selectGameCards);
  const statisticsCards = useSelector(statisticsCardsSlice);
  const settings = useSelector(selectGameSetting);
  const issueIdSelected = useSelector(issueIdSelectedSlice);
  const issueSelected = issues[Number(issueIdSelected)];

  React.useEffect(() => {
    const isAdminPlayer = settings.masterIsPlayer;
    const payload = { isAdminPlayer, admin, users };
    dispatch(initIssueChat(payload));
  }, []);

  console.log('statisticsCards', statisticsCards);

  React.useEffect(() => {
    const updateSelectedIssueIdSuccess = (response: string): void => {
      console.log('round-is-starting', response);

      if (!isAdmin) dispatch(selectedIssue(response));
      dispatch(setIsPlayingNow(true));
      dispatch(setIsShowResultOfVoting(false));
      dispatch(initStatisticsCards(cards));
    };

    socket.on('round-is-starting', updateSelectedIssueIdSuccess);

    return (): void => {
      socket.off('round-is-starting', updateSelectedIssueIdSuccess);
    };
  });

  // React.useEffect(() => {
  //   const updateIssuesChatSuccess = (response: ResponseFromSocket): void => {
  //     console.log(response);
  //     const { eventName, code, error: responseError, data } = response;

  //     // eslint-disable-next-line no-console
  //     if (responseError) console.log(`${eventName}: ${code}: ${responseError}`);
  //     else {
  //       const { vote: responseVote } = data;
  //       dispatch(updateIssueChat(responseVote));
  //     }
  //   };

  //   socket.on('update-voting-results', updateIssuesChatSuccess);

  //   return (): void => {
  //     socket.off('update-voting-results', updateIssuesChatSuccess);
  //   };
  // });

  return (
    <div className={styles.game_wrap}>
      <div className={styles.game_container}>
        <TitleSection
          title={`Planning (issues: ${issues
            .map((is) => is.title)
            .filter((is, id) => id < 4)
            .join(', ')}${issues.length > 5 && ', ...'})`}
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
                <div>{issueSelected.desc}</div>
                {isAdmin && <RunRoundButton />}
                <TitleSection title={'please, make your choise:'} />
                {cards && cards.map((card) => <CardGame key={card.id} card={card} />)}
                <TitleSection title={'statistics:'} />
                {statisticsCards && statisticsCards.map((card) => <StatisticsCard key={card.id} card={card} />)}
                <TitleSection title={'members:'} />
                <div>
                  <IssueChatUserCard
                    userId={admin.userId}
                    firstName={admin.firstName}
                    lastName={admin.lastName}
                    role={admin.role}
                    job={admin.job}
                  />
                  {users.map((user: Member) => (
                    <IssueChatUserCard
                      key={user.userId}
                      userId={user.userId}
                      firstName={user.firstName}
                      lastName={user.lastName}
                      role={user.role}
                      job={user.job}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className={styles.game_vote}>
            <ChatToVoteOnIssue />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
