import React, { FC } from 'react';
import styles from './FooterTeamLink.module.scss';
import gitLogo from '../../assets/images/svg/gitHubLink.svg';

interface Props {
  url: string;
  imgAlt: string;
}

const FooterTeamLink: FC<Props> = ({ url, imgAlt }) => (
  <a href={url} rel="noreferrer" target="_blank">
    <div className={styles.FooterTeamLink}>
      <img src={gitLogo} alt={imgAlt} />
    </div>
  </a>
);

export default FooterTeamLink;
