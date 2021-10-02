import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { Socket } from 'socket.io-client';
import CardUser from '../../components/CardUser/CardUser';
import Chat from '../../components/Chat/Chat';
import TitleSection from '../../components/TitleSection/TitleSection';
import LobbyScramButtons from '../../components/LobbyScramButtons/LobbyScramButtons';
import LobbyMembers from '../../components/LobbyMembers/LobbyMembers';
import LobbyIssues from '../../components/LobbyIssues/LobbyIssues';
import LobbySetting from '../../components/LobbySetting/LobbySetting';
import KickModal from '../../components/KickModal/KickModal';
import ChatOpenButton from '../../components/ChatOpenButton/ChatOpenButton';
import {
  isModalOpenSlice,
  setIsModalOpen,
  setIsModalOpenBySocketEvent,
  setKickId,
  setWhoKick,
  setWhoWillBeKicked,
} from '../../redux/slices/kickSlice';
import {
  adminSlice,
  allUsersSlice,
  currentRoomSlice,
  currentUserSlice,
  deleteMember,
  initRoom,
  isAdminSlice,
  isLateSlice,
  updateMembers,
} from '../../redux/slices/roomSlice';
import { SocketContext } from '../../socketContext';
import { ResponseFromSocket } from '../../types/common';
import exitToMainPage from '../../utils/exit';
import ExitButton from '../../components/ExitButton/ExitButton';
import { setSettings } from '../../redux/slices/gameSettingSlice';

import styles from './LobbyPage.module.scss';
import { setIssues } from '../../redux/slices/issuesSlice';
import { setGameCards } from '../../redux/slices/gameCardsSlice';
import { initStatisticsCards } from '../../redux/slices/gameProcessSlice';

const LobbyPage: FC = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const socket = React.useContext<Socket<DefaultEventsMap, DefaultEventsMap>>(SocketContext);

  const room = useSelector(currentRoomSlice);
  const currentUser = useSelector(currentUserSlice);
  const admin = useSelector(adminSlice);
  const users = useSelector(allUsersSlice);
  const [isVisible, setIsVisible] = React.useState(false);
  const isKickModalOpen = useSelector(isModalOpenSlice);
  const isAdmin = useSelector(isAdminSlice);
  const isLate = useSelector(isLateSlice);

  React.useEffect(() => {
    const updateAllChatSuccess = (response: ResponseFromSocket): void => {
      console.log(response);
      const { eventName, code, error: responseError, data } = response;
      // eslint-disable-next-line no-console
      if (responseError) console.log(`${eventName}: ${code}: ${responseError}`);
      else {
        const { user: responseUser } = data;
        dispatch(deleteMember(responseUser));

        if (currentUser.userId === responseUser.userId) exitToMainPage();
      }
    };

    socket.on('delete-kicked-user', updateAllChatSuccess);

    return (): void => {
      socket.off('delete-kicked-user', updateAllChatSuccess);
    };
  });

  React.useEffect(() => {
    const updateMembersSuccess = (response: ResponseFromSocket): void => {
      console.log(response);
      const { eventName, code, error: responseError, data } = response;

      // eslint-disable-next-line no-console
      if (responseError) console.log(`${eventName}: ${code}: ${responseError}`);
      else {
        const { user: responseUser } = data;
        dispatch(updateMembers(responseUser));
      }
    };

    socket.on('add-member', updateMembersSuccess);

    return (): void => {
      socket.off('add-member', updateMembersSuccess);
    };
  });

  React.useEffect(() => {
    const callback = (response: ResponseFromSocket): void => {
      console.log(response);

      const { eventName, code, error: responseError, data } = response;

      if (responseError) {
        // eslint-disable-next-line no-console
        console.log(`${eventName}: ${code}: ${responseError}`);
        history.push('/');
      } else {
        const { users: responseUsers } = data;
        dispatch(initRoom(responseUsers));
      }
    };

    socket.emit('get-all-users-in-room', { room }, callback);
  }, [dispatch, history, room, socket]);

  React.useEffect(() => {
    const kickUserSuccess = (response: ResponseFromSocket): void => {
      console.log(response);
      const { eventName, code, error: responseError, data } = response;
      // eslint-disable-next-line no-console
      if (responseError) console.log(`${eventName}: ${code}: ${responseError}`);
      else {
        const { kick: responseKick } = data;
        dispatch(setWhoKick(responseKick.whoKick));
        dispatch(setWhoWillBeKicked(responseKick.whoWillBeKicked));
        dispatch(setKickId(responseKick.kickId));
        dispatch(setIsModalOpenBySocketEvent(true));
        dispatch(setIsModalOpen(true));
      }
    };

    socket.on('do-you-want-kick-user', kickUserSuccess);

    return (): void => {
      socket.off('do-you-want-kick-user', kickUserSuccess);
    };
  });

  React.useEffect(() => {
    const moveAllMembersToGamePageSuccess = (response: ResponseFromSocket): void => {
      console.log(response);
      const { eventName, code, error: responseError, data } = response;

      // eslint-disable-next-line no-console
      if (responseError) console.log(`${eventName}: ${code}: ${responseError}`);
      else {
        if (!isAdmin) {
          const { game: responseGame } = data;
          dispatch(setSettings(responseGame.settings));
          dispatch(setIssues(responseGame.issues));
          dispatch(setGameCards(responseGame.cards));
          dispatch(initStatisticsCards(responseGame.cards));
        }
        history.push('/game');
      }
    };

    socket.on('game-is-starting', moveAllMembersToGamePageSuccess);

    return (): void => {
      socket.off('game-is-starting', moveAllMembersToGamePageSuccess);
    };
  });

  React.useEffect(() => {
    const deleteGameSuccess = (response: ResponseFromSocket): void => {
      console.log(response);
      const { eventName, code, error: responseError } = response;

      // eslint-disable-next-line no-console
      if (responseError) console.log(`${eventName}: ${code}: ${responseError}`);
      else {
        history.push('/');
        exitToMainPage();
      }
    };

    socket.on('game-end', deleteGameSuccess);

    return (): void => {
      socket.off('game-end', deleteGameSuccess);
    };
  });

  return (
    <>
      {!isLate && (
        <div className={styles.lobbyPage_wrap}>
          <div className={styles.lobbyPage_container}>
            <TitleSection title={'Poker Planning'} isCapitalLetters />
            <div className={styles.lobbyPage_section}>
              <p>Scram master:</p>
            </div>
            <div className={styles.lobbyPage_section}>
              <CardUser
                userId={admin.userId}
                firstName={admin.firstName}
                lastName={admin.lastName}
                jobPosition={admin.job}
                role={admin.role}
              />
            </div>
            {isAdmin ? <LobbyScramButtons room={room} /> : <ExitButton />}
            <LobbyMembers users={users} />
            {isAdmin && <LobbyIssues />}
            {isAdmin && <LobbySetting />}
          </div>
          <ChatOpenButton isVisible={isVisible} setIsVisible={setIsVisible} />
          {isVisible && <Chat isVisible={isVisible} setIsVisible={setIsVisible} />}
          {isKickModalOpen && <KickModal />}
        </div>
      )}
      {isLate && (
        <div>You late. Now wait for the admin to decide whether to allow you to play or kick you out of the game</div>
      )}
    </>
  );
};

export default LobbyPage;
