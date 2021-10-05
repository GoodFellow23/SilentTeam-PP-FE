import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { isPlayingNowSlice } from '../../redux/slices/gameProcessSlice';
import { selectGameSetting } from '../../redux/slices/gameSettingSlice';
import VoitingLoader from '../VoitingLoader/VoitingLoader';
import coffeeImg from '../../assets/images/svg/cap_of_coffee.svg';

import styles from './IssueChatScoreCard.module.scss';

interface Props {
  value: string;
}

const IssueChatScoreCard: FC<Props> = ({ value }) => {
  const { storyTypeShort } = useSelector(selectGameSetting);
  const isPlayingNow = useSelector(isPlayingNowSlice);

  return (
    <div className={styles.IssueChatScoreCard_wrap}>
      <div className={styles.IssueChatScoreCard_value}>
        {isPlayingNow && <VoitingLoader />}
        {!isPlayingNow && value === 'coffeetime' && <img src={coffeeImg} alt="coffee" />}
        {!isPlayingNow && value !== 'coffeetime' && value}
      </div>
      {!isPlayingNow && value !== 'coffeetime' && (
        <div className={styles.IssueChatScoreCard_storyTypeShort}>{storyTypeShort}</div>
      )}
    </div>
  );
};

export default IssueChatScoreCard;
