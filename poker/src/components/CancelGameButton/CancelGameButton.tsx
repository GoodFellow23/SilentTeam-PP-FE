import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { currentRoomSlice } from '../../redux/slices/roomSlice';
import { SocketContext } from '../../socketContext';
import GeneralButton from '../GeneralButton/GeneralButton';

const CancelGameButton: FC = () => {
  const socket = React.useContext<Socket<DefaultEventsMap, DefaultEventsMap>>(SocketContext);

  const room = useSelector(currentRoomSlice);

  const handleCancelGame = (): void => {
    socket.emit('cancel-game', room);
  };

  return <GeneralButton type="button" label={'Cancel Game'} primaryBG onClick={handleCancelGame} />;
};

export default CancelGameButton;
