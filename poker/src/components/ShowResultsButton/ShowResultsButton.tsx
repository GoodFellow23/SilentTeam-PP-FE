import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { isShowResultOfVotingSlice } from '../../redux/slices/gameProcessSlice';
import { currentRoomSlice } from '../../redux/slices/roomSlice';
import { SocketContext } from '../../socketContext';
import GeneralButton from '../GeneralButton/GeneralButton';

const ShowResultsButton: FC = () => {
  const socket = React.useContext<Socket<DefaultEventsMap, DefaultEventsMap>>(SocketContext);

  const room = useSelector(currentRoomSlice);
  const isShowResultOfVoting = useSelector(isShowResultOfVotingSlice);

  const handleShowResults = (): void => {
    socket.emit('show-results', room);
  };

  return (
    <GeneralButton
      type="button"
      label={'Show Results'}
      primaryBG
      onClick={handleShowResults}
      isDisable={!isShowResultOfVoting}
    />
  );
};

export default ShowResultsButton;
