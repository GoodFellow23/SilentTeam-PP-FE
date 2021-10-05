import React, { FC, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

import GeneralButton from '../GeneralButton/GeneralButton';
import { issueIdSelectedSlice } from '../../redux/slices/gameProcessSlice';
import { currentRoomSlice } from '../../redux/slices/roomSlice';
import { SocketContext } from '../../socketContext';

const RunRoundButton: FC = () => {
  const socket = useContext<Socket<DefaultEventsMap, DefaultEventsMap>>(SocketContext);

  const room = useSelector(currentRoomSlice);
  const issueIdSelected = useSelector(issueIdSelectedSlice);

  const handleRunRound = (): void => {
    socket.emit('run-round', room, issueIdSelected);
  };

  return <GeneralButton type="button" label={'Run Round'} primaryBG onClick={handleRunRound} />;
};

export default RunRoundButton;
