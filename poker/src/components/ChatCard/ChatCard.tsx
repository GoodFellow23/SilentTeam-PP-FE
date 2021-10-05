import React, { FC } from 'react';
import { KICK } from '../../constants';
import { Message } from '../../types/common';
import KickChatCard from '../KickChatCard/KickChatCard';
import MessageChatCard from '../MessageChatCard/MessageChatCard';

interface Props {
  messageCard: Message;
}

const ChatCard: FC<Props> = ({ messageCard }) => {
  const { type } = messageCard;

  return (
    <>{type === KICK ? <KickChatCard messageCard={messageCard} /> : <MessageChatCard messageCard={messageCard} />}</>
  );
};

export default ChatCard;
