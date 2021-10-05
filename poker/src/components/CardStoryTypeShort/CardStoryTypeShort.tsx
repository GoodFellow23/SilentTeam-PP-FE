import React, { FC } from 'react';
import styles from './CardStoryTypeShort.module.scss';

interface Props {
  label: string;
}

const CardStoryTypeShort: FC<Props> = ({ label }) => (
  <div className={styles.Card_wrap}>
    <p className={styles.Card_value_top}>12</p>
    <h3>{label}</h3>
    <p className={styles.Card_value_bottom}>12</p>
  </div>
);

export default CardStoryTypeShort;
