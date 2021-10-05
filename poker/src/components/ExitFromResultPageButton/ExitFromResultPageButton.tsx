import React, { FC, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import GeneralButton from '../GeneralButton/GeneralButton';
import { currentRoomSlice, isAdminSlice } from '../../redux/slices/roomSlice';
import { SocketContext } from '../../socketContext';
import exitToMainPage from '../../utils/exit';
import { ResponseFromSocket } from '../../types/common';

const ExitFromResultPageButton: FC = () => {
  const socket = useContext<Socket<DefaultEventsMap, DefaultEventsMap>>(SocketContext);

  const history = useHistory();

  const room = useSelector(currentRoomSlice);
  const isAdmin = useSelector(isAdminSlice);

  const handleExitFromResultPage = (): void => {
    if (isAdmin) {
      const callback = (response: ResponseFromSocket): void => {
        // eslint-disable-next-line no-console
        console.log('delete-room', response);

        const { eventName, code, error: responseError } = response;

        // eslint-disable-next-line no-console
        if (responseError) console.log(`${eventName}: ${code}: ${responseError}`);
      };

      socket.emit('delete-room', room, callback);
    }
    history.push('/');
    exitToMainPage();
  };

  return <GeneralButton type="button" label={'Exit'} onClick={handleExitFromResultPage} />;
};

export default ExitFromResultPageButton;
