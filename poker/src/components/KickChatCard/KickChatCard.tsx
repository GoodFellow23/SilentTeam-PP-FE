import React, { FC } from 'react';
import Avatar from '../Avatar/Avatar';
import { Message, SIZES } from '../../types/common';

import styles from './KickChatCard.module.scss';

interface Props {
  messageCard: Message;
}

const KickChatCard: FC<Props> = ({ messageCard }) => {
  const { firstName, lastName, role, message } = messageCard;

  return (
    <div className={styles.kickChatCard_wrap}>
      <div className={styles.kickChatCard_header}>
        <div className={styles.kickChatCard_user}>
          <Avatar role={role} size={SIZES.SMALL} firstName={firstName} lastName={lastName} />
          <div className={styles.kickChatCard_name}>
            {firstName} {lastName}
          </div>
        </div>
      </div>
      <p className={styles.kickChatCard_content}>{message}</p>
    </div>
  );
};

export default KickChatCard;
