import React, { Dispatch, FC, SetStateAction } from 'react';
import iconChatOpen from '../../assets/images/svg/add_message.svg';

import styles from './ChatOpenButton.module.scss';

interface Props {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

const ChatOpenButton: FC<Props> = ({ isVisible, setIsVisible }) => {
  const handleOpenChat = (): void => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={styles.icon_open_chat_wrap} onClick={handleOpenChat}>
      <img src={iconChatOpen} alt={'open chat'} />
    </div>
  );
};

export default ChatOpenButton;
