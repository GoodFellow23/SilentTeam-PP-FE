import React, { FC, Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';

import IssueChatScoreCard from '../IssueChatScoreCard/IssueChatScoreCard';
import IssueChatUserCard from '../IssueChatUserCard/IssueChatUserCard';
import ChatCloseButton from '../ChatCloseButton/ChatCloseButton';

import { issueChatSlice } from '../../redux/slices/gameProcessSlice';

import styles from './ChatToVoteOnIssue.module.scss';

interface Props {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

const ChatToVoteOnIssue: FC<Props> = ({ isVisible, setIsVisible }) => {
  const issueChat = useSelector(issueChatSlice);

  const lastUserRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  React.useEffect(() => {
    lastUserRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }, [issueChat, lastUserRef]);

  return (
    <div className={styles.Chat_wrap}>
      <ChatCloseButton isVisible={isVisible} setIsVisible={setIsVisible} />
      <div className={styles.Chat_cards}>
        {issueChat.length > 0
          && issueChat.map((item, index) => (
            <div className={styles.Chat_card} key={item.userId + index}>
              <IssueChatScoreCard value={item.value} />
              <IssueChatUserCard
                userId={item.userId}
                firstName={item.firstName}
                lastName={item.lastName}
                role={item.role}
                job={item.job}
              />
            </div>
          ))}
        <div ref={lastUserRef}></div>
      </div>
    </div>
  );
};

export default ChatToVoteOnIssue;
