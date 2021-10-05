import React, { FC } from 'react';
import { ROLES, SIZES } from '../../types/common';

import styles from './Avatar.module.scss';

interface Props {
  role: ROLES;
  size: SIZES;
  firstName: string;
  lastName?: string;
}

const Avatar: FC<Props> = ({ role, size, firstName, lastName }) => (
  <div className={`${styles[size]} ${styles[role]}`}>
    <p className={styles.Avatar_text}>
      {lastName ? `${firstName[0]}${lastName[0]}` : `${firstName[0]}${firstName[firstName.length - 1]}`}
    </p>
  </div>
);

export default Avatar;
