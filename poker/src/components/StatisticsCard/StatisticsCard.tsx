import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import Card from '../Card/Card';

import { SIZES, StatisticCard } from '../../types/common';
import { isShowResultOfVotingSlice } from '../../redux/slices/gameProcessSlice';

import styles from './StatisticCard.module.scss';

interface Props {
  card: StatisticCard;
}

const StatisticsCard: FC<Props> = ({ card }) => {
  const isShowResultOfVoting = useSelector(isShowResultOfVotingSlice);

  return (
    <div className={styles.stat_wrapper}>
      <Card card={card} isShowCards={isShowResultOfVoting} size={SIZES.SMALL} />
      {isShowResultOfVoting && <p>{card.scoreInPercent}%</p>}
    </div>
  );
};

export default StatisticsCard;
