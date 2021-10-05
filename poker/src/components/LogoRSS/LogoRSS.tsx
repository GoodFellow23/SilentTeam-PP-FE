import React, { FC } from 'react';
import logoSchool from '../../assets/images/svg/rs_school_js_white.svg';
import styles from './LogoRSS.module.scss';

const LogoRSS: FC = () => (
  <a href="https://rs.school/react/">
    <div className={styles.Logo_rs_wrapper}>
      <img className={styles.Logo_rs_img} src={logoSchool} alt="logo school rss" />
    </div>
  </a>
);

export default LogoRSS;
