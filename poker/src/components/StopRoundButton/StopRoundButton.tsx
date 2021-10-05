import React, { FC, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { SocketContext } from '../../socketContext';
import { currentRoomSlice } from '../../redux/slices/roomSlice';
import { setIsPlayingNow, setIsShowResultOfVoting } from '../../redux/slices/gameProcessSlice';
import GeneralButton from '../GeneralButton/GeneralButton';

const StopRoundButton: FC = () => {
  const socket = useContext<Socket<DefaultEventsMap, DefaultEventsMap>>(SocketContext);

  const dispatch = useDispatch();

  const room = useSelector(currentRoomSlice);

  const handleStopRound = (): void => {
    dispatch(setIsPlayingNow(false));
    dispatch(setIsShowResultOfVoting(true));
    socket.emit('stop-round', room);
  };

  return <GeneralButton type="button" label={'Stop Round'} primaryBG onClick={handleStopRound} />;
};

export default StopRoundButton;
