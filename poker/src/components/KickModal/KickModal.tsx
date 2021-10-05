import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { INIT_MEMBER } from '../../constants';
import GeneralButton from '../GeneralButton/GeneralButton';
import {
  isModalOpenBySocketEventSlice,
  kickIdSlice,
  setIsModalOpen,
  setIsModalOpenBySocketEvent,
  setWhoKick,
  setWhoWillBeKicked,
  whoKickSlice,
  whoWillBeKickedSlice,
} from '../../redux/slices/kickSlice';
import { SocketContext } from '../../socketContext';
import { KICKED_MESSAGES, ROLES } from '../../types/common';

import styles from './KickModal.module.scss';
import { currentRoomSlice } from '../../redux/slices/roomSlice';

const KickModal: FC = () => {
  const socket = React.useContext<Socket<DefaultEventsMap, DefaultEventsMap>>(SocketContext);

  const dispatch = useDispatch();

  const isModalOpenBySocketEvent = useSelector(isModalOpenBySocketEventSlice);
  const kickId = useSelector(kickIdSlice);
  const currentRoom = useSelector(currentRoomSlice);
  const whoKick = useSelector(whoKickSlice);
  const whoWillBeKicked = useSelector(whoWillBeKickedSlice);

  const handleClickConfirm = (): void => {
    if (whoKick.role === ROLES.ADMIN) {
      const payload = {
        room: currentRoom,
        message: KICKED_MESSAGES.BY_ADMIN,
        userId: whoWillBeKicked.userId,
        firstName: whoWillBeKicked.firstName,
        lastName: whoWillBeKicked.lastName,
        role: whoWillBeKicked.role,
      };
      socket.emit('kick-user', payload);
      dispatch(setIsModalOpen(false));
    } else if (!isModalOpenBySocketEvent) {
      const payload = {
        room: currentRoom,
        whoKick,
        whoWillBeKicked,
      };
      socket.emit('user-want-voiting', payload);
    } else if (isModalOpenBySocketEvent) {
      const answer = {
        room: currentRoom,
        whoKick,
        whoWillBeKicked,
        kickId,
      };
      socket.emit('kick-user-by-user', answer);
    }
    dispatch(setWhoKick(INIT_MEMBER));
    dispatch(setWhoWillBeKicked(INIT_MEMBER));
    dispatch(setIsModalOpenBySocketEvent(false));
    dispatch(setIsModalOpen(false));
  };

  const handleClickCancel = (): void => {
    dispatch(setWhoKick(INIT_MEMBER));
    dispatch(setWhoWillBeKicked(INIT_MEMBER));
    dispatch(setIsModalOpenBySocketEvent(false));
    dispatch(setIsModalOpen(false));
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.modal}>
        <h2 className={styles.header}>Kick Player?</h2>
        {isModalOpenBySocketEvent ? (
          <p className={styles.text}>
            <span className={styles.name}>
              {whoKick.firstName} {whoKick.lastName} {}
            </span>
            want to kick member {}
            <span className={styles.name}>
              {whoWillBeKicked.firstName} {whoWillBeKicked.lastName}. {}
            </span>
            Do you agree with it?
          </p>
        ) : (
          <p className={styles.text}>
            Are you really want to remove player {}
            <span className={styles.name}>
              {whoWillBeKicked.firstName} {}
              {whoWillBeKicked.lastName} {}
            </span>
            from game session?
          </p>
        )}
        <div className={styles.buttons}>
          <GeneralButton type="button" label={'Yes'} onClick={handleClickConfirm} primaryBG />
          <GeneralButton type="button" label={'No'} onClick={handleClickCancel} />
        </div>
      </div>
    </div>
  );
};

export default KickModal;
