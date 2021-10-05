import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import kickIcon from '../../assets/images/svg/kick.svg';
import {
  setIsModalOpen,
  setIsModalOpenBySocketEvent,
  setWhoKick,
  setWhoWillBeKicked,
} from '../../redux/slices/kickSlice';
import { currentUserSlice } from '../../redux/slices/roomSlice';
import { ROLES, SIZES } from '../../types/common';

import styles from './KickButton.module.scss';

interface Props {
  size: SIZES;
  userId: string;
  firstName: string;
  lastName?: string;
  role: ROLES;
}

const KickButton: FC<Props> = ({ size, userId, firstName, lastName, role }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSlice);
  const kickedUser = { userId, firstName, lastName, role };

  const handleOnKickUser = (): void => {
    dispatch(setWhoKick(currentUser));
    dispatch(setWhoWillBeKicked(kickedUser));
    dispatch(setIsModalOpenBySocketEvent(false));
    dispatch(setIsModalOpen(true));
  };

  return <img className={styles[size]} src={kickIcon} alt="kick" onClick={handleOnKickUser} />;
};

export default KickButton;
