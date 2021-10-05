import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

import ChatCard from '../ChatCard/ChatCard';
import ChatInput from '../ChatInput/ChatInput';
import ChatCloseButton from '../ChatCloseButton/ChatCloseButton';

import { chatMessagesSlice, updateAllChat, updateChat } from '../../redux/slices/chatSlice';
import { currentRoomSlice } from '../../redux/slices/roomSlice';
import { SocketContext } from '../../socketContext';
import { ResponseFromSocket } from '../../types/common';

import styles from './Chat.module.scss';

interface Props {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

const Chat: FC<Props> = ({ isVisible, setIsVisible }) => {
  const chat = useSelector(chatMessagesSlice);
  const room = useSelector(currentRoomSlice);
  const socket = useContext<Socket<DefaultEventsMap, DefaultEventsMap>>(SocketContext);
  const dispatch = useDispatch();

  const lastMessageRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }, [chat, lastMessageRef]);

  useEffect(() => {
    const callback = (response: ResponseFromSocket): void => {
      // eslint-disable-next-line no-console
      console.log(response);

      const { eventName, code, error: responseError, data } = response;

      // eslint-disable-next-line no-console
      if (responseError) console.log(`${eventName}: ${code}: ${responseError}`);
      else {
        const { messages: responseMessages } = data;
        dispatch(updateAllChat(responseMessages));
      }
    };

    socket.emit('get-all-chat', room, callback);
  }, [dispatch, room, socket]);

  useEffect(() => {
    const updateAllChatSuccess = (response: ResponseFromSocket): void => {
      // eslint-disable-next-line no-console
      console.log(response);

      const { eventName, code, error: responseError, data } = response;
      // eslint-disable-next-line no-console
      if (responseError) console.log(`${eventName}: ${code}: ${responseError}`);
      else {
        const { messages: responseMessages } = data;
        dispatch(updateAllChat(responseMessages));
      }
    };

    socket.on('update-chat', updateAllChatSuccess);

    return (): void => {
      socket.off('update-chat', updateAllChatSuccess);
    };
  });

  useEffect(() => {
    const updateChatSuccess = (response: ResponseFromSocket): void => {
      // eslint-disable-next-line no-console
      console.log(response);

      const { eventName, code, error: responseError, data } = response;

      // eslint-disable-next-line no-console
      if (responseError) console.log(`${eventName}: ${code}: ${responseError}`);
      else {
        const { message: responseMessage } = data;
        dispatch(updateChat(responseMessage));
      }
    };

    socket.on('get-message', updateChatSuccess);

    return (): void => {
      socket.off('get-message', updateChatSuccess);
    };
  });

  return (
    <div className={styles.Chat_wrap}>
      <ChatCloseButton isVisible={isVisible} setIsVisible={setIsVisible} />
      <div className={styles.Chat_cards}>
        {chat.length > 0 && chat.map((item, index) => <ChatCard key={item.userId + index} messageCard={item} />)}
        <div ref={lastMessageRef}></div>
      </div>
      <div className={styles.Chat_input}>
        <ChatInput />
      </div>
    </div>
  );
};

export default Chat;
