import React, { FC } from 'react';
import styles from './Logo.module.scss';

const Logo: FC = () => (
  <div className={styles.Logo_bg}>
    <div className={styles.Logo_upP}>P</div>
    <div className={styles.Logo_downP}>P</div>
  </div>
);

export default Logo;
