import React from 'react';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

const initialContextValue = {} as Socket<DefaultEventsMap, DefaultEventsMap>;

const SocketContext = React.createContext(initialContextValue);

const SocketProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const endpoint = process.env.REACT_APP_SOCKET_ENDPOINT || '';

  const socket: Socket<DefaultEventsMap, DefaultEventsMap> = io(endpoint, {
    transports: ['websocket', 'polling'],
  }) as Socket<DefaultEventsMap, DefaultEventsMap>;

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export { SocketContext, SocketProvider };
