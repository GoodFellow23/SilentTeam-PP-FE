import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { currentRoomSlice, currentUserSlice } from '../../redux/slices/roomSlice';
import { SocketContext } from '../../socketContext';
import GeneralButton from '../GeneralButton/GeneralButton';

const ExitButton: FC = () => {
  const socket = React.useContext<Socket<DefaultEventsMap, DefaultEventsMap>>(SocketContext);
  const room = useSelector(currentRoomSlice);
  const { userId } = useSelector(currentUserSlice);

  const handleUserExit = (): void => {
    socket.emit('user-exit', userId, room);
  };

  return <GeneralButton type="button" label={'Exit'} onClick={handleUserExit} />;
};

export default ExitButton;
