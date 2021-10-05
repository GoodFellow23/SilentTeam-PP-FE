import React, { FC } from 'react';
import styles from './TitleSection.module.scss';

interface Props {
  title: string;
  isCapitalLetters?: boolean;
}

const TitleSection: FC<Props> = ({ title, isCapitalLetters }) => (
  <div className={isCapitalLetters ? styles.title_section_capital : styles.title_section}>
    <h3>{title}</h3>
  </div>
);

export default TitleSection;
