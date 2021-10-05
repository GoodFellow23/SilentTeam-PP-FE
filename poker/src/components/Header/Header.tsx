import React, { FC } from 'react';
import Logo from '../Logo/Logo';

import styles from './Header.module.scss';

const Header: FC = () => (
  <div className={styles.Header_wrapper}>
    <div className={styles.Header_topLine}></div>
    <div className={styles.Header_bottomLine}>
      <div className={styles.Header_logoWrap}>
        <Logo />
      </div>
    </div>
  </div>
);

export default Header;
