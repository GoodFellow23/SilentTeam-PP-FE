import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { SocketContext } from '../../socketContext';
import { KICKED_MESSAGES } from '../../types/common';
import Modal from '../Modal/Modal';
import { initStatisticsCards, lateUserSlice, setIsLateModalOpen } from '../../redux/slices/gameProcessSlice';
import { currentRoomSlice } from '../../redux/slices/roomSlice';
import { selectGameSetting } from '../../redux/slices/gameSettingSlice';
import { selectIssues } from '../../redux/slices/issuesSlice';
import { selectGameCards } from '../../redux/slices/gameCardsSlice';

const IsLateModal: FC = () => {
  const socket = React.useContext<Socket<DefaultEventsMap, DefaultEventsMap>>(SocketContext);

  const dispatch = useDispatch();

  const room = useSelector(currentRoomSlice);
  const lateUser = useSelector(lateUserSlice);
  const {
    masterIsPlayer: isAdminBePlayerInGame,
    isNeededTimer,
    storyTypeShort,
    roundTime,
  } = useSelector(selectGameSetting);
  const issues = useSelector(selectIssues);
  const cards = useSelector(selectGameCards);

  const handleClickConfirm = (): void => {
    dispatch(initStatisticsCards(cards));

    const settings = { isAdminBePlayerInGame, isNeededTimer, storyTypeShort, roundTime };

    socket.emit('add-later-in-game', room, settings, issues, cards, lateUser);
    dispatch(setIsLateModalOpen(false));
  };

  const handleClickCancel = (): void => {
    if (lateUser) {
      const payload = {
        room,
        message: KICKED_MESSAGES.BY_ADMIN,
        userId: lateUser.userId,
        firstName: lateUser.firstName,
        lastName: lateUser.lastName,
        role: lateUser.role,
      };
      socket.emit('kick-user', payload);
    }
    dispatch(setIsLateModalOpen(false));
  };

  const text = `Allow a latecomer ${lateUser && lateUser.firstName} ${lateUser && lateUser.lastName} to join the game?`;

  return (
    <Modal
      title={'Allow user to play or kick user'}
      text={text}
      handleClickConfirm={handleClickConfirm}
      handleClickCancel={handleClickCancel}
    />
  );
};

export default IsLateModal;
