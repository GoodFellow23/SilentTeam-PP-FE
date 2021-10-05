import React, { FC } from 'react';

import styles from './VoitingLoader.module.scss';

const VoitingLoader: FC = () => (
  <div className={styles.loader}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default VoitingLoader;
