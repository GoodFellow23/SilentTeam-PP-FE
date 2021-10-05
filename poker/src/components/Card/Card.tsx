import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { CardGameSetting, SIZES } from '../../types/common';
import { selectGameSetting } from '../../redux/slices/gameSettingSlice';

import playCardCoverImg from '../../assets/images/png/play-card-cover.jpg';
import coffeetime from '../../assets/images/svg/cap_of_coffee.svg';

import styles from './Card.module.scss';

interface Props {
  card: CardGameSetting;
  isShowCards: boolean;
  size: SIZES;
}

const Card: FC<Props> = ({ card, isShowCards, size }) => {
  const { storyTypeShort: title } = useSelector(selectGameSetting);

  return (
    <div className={`${styles[size]}`}>
      <div className={isShowCards ? styles.card_content_show : styles.card_content_no_show}>
        {card.value === 'coffeetime' ? (
          <div className={styles.card_coffeetime}>
            <img src={coffeetime} alt="cap of coffee" />
          </div>
        ) : (
          <div className={styles.card_value}>
            <p className={styles.card_value_top}>{card.value}</p>
            <h3>{title}</h3>
            <p className={styles.card_value_bottom}>{card.value}</p>
          </div>
        )}

        <div className={isShowCards ? styles.card_cover_no_show : styles.card_cover_show}>
          <img src={playCardCoverImg} alt="cover of card" />
        </div>
      </div>
    </div>
  );
};

export default Card;
