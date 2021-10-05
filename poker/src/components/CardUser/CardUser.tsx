import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { adminSlice, allUsersSlice, currentUserSlice, isAdminSlice } from '../../redux/slices/roomSlice';
import { ROLES, SIZES } from '../../types/common';
import checkIsCanShowKickButton from '../../utils/checkIsCanShowKickButton';
import Avatar from '../Avatar/Avatar';
import KickButton from '../KickButton/KickButton';

import styles from './CardUser.module.scss';

export interface userProps {
  userId: string;
  firstName: string;
  lastName?: string;
  jobPosition?: string;
  role: ROLES;
}

const CardUser: FC<userProps> = ({ userId, firstName, lastName, jobPosition, role }) => {
  const { userId: currentUserId } = useSelector(currentUserSlice);
  const { userId: currentAdminId } = useSelector(adminSlice);
  const isAdmin = useSelector(isAdminSlice);
  const countUsers = useSelector(allUsersSlice).length;

  const isShowKickButton = checkIsCanShowKickButton(userId, isAdmin, currentUserId, currentAdminId, countUsers);

  return (
    <div className={styles.CardUser_wrap}>
      <div className={styles.CardUser_wrapAva}>
        <Avatar size={SIZES.MEDIUM} firstName={firstName} lastName={lastName} role={role} />
        {userId === currentUserId && <span>it's you</span>}
      </div>
      <div className={styles.CardUser_fullName}>
        {lastName && <p className={styles.CardUser_surname}>{lastName}</p>}
        <h3>{firstName}</h3>
        {jobPosition && <p className={styles.CardUser_job}>{jobPosition}</p>}
      </div>
      <div className={styles.CardUser_kickButtonWrapper}>
        {isShowKickButton && (
          <KickButton size={SIZES.MEDIUM} userId={userId} firstName={firstName} lastName={lastName} role={role} />
        )}
      </div>
    </div>
  );
};

export default CardUser;
