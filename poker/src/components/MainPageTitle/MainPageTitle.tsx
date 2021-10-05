import React, { FC } from 'react';
import cards from '../../assets/images/png/cards.png';
import styles from './MainPageTitle.module.scss';

const MainPageTitle: FC = () => (
  <div className={styles.main_page_title_wrap}>
    <div className={styles.main_page_title_left}>
      <img src={cards} alt={'pocker planning'} />
    </div>
    <div className={styles.main_page_title_right}>
      <h2>Poker</h2>
      <h2>Planning</h2>
    </div>
  </div>
);

export default MainPageTitle;
