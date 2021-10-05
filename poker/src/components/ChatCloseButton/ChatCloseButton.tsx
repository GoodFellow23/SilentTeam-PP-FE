import React, { Dispatch, FC, SetStateAction } from 'react';
import iconChatClose from '../../assets/images/svg/close.svg';

import styles from './ChatCloseButton.module.scss';

interface Props {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

const ChatCloseButton: FC<Props> = ({ isVisible, setIsVisible }) => {
  const handleOpenChat = (): void => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={styles.icon_close_chat_wrap}>
      <div className={styles.icon_close_chat_item} onClick={handleOpenChat}>
        <img src={iconChatClose} alt={'close chat'} />
      </div>
    </div>
  );
};

export default ChatCloseButton;
