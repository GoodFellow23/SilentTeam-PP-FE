import React, { FC } from 'react';
import LogoRSS from '../LogoRSS/LogoRSS';
import styles from './Footer.module.scss';
import FooterTeamLink from '../FooterTeamLink/FooterTeamLink';

interface Team {
  name: string;
  position: string;
  url: string;
}

const teams: Team[] = [
  {
    name: 'anatoliyak',
    position: 'mentor/teamlead',
    url: 'https://github.com/anatoliyak',
  },
  {
    name: 'GoodFellow23',
    position: 'frontend dev',
    url: 'https://github.com/GoodFellow23',
  },
  {
    name: 'Evgenia-cyber',
    position: 'fullstack dev',
    url: 'https://github.com/Evgenia-cyber',
  },
  {
    name: 'Vlad-coder-678',
    position: 'frontend dev',
    url: 'https://github.com/Vlad-coder-678',
  },
];

const Footer: FC = () => (
  <div className={styles.Footer_wrap}>
    <div className={styles.Footer_item}>
      Made by
      {teams.map(({ url, name }) => (
        <div key={name}>
          <FooterTeamLink url={url} imgAlt={name} />
        </div>
      ))}
    </div>
    <div className={styles.Footer_item}>
      from
      <LogoRSS />
      in 2021
    </div>
  </div>
);

export default Footer;
