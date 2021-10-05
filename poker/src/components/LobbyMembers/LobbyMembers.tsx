import React, { FC } from 'react';
import { Member } from '../../types/common';
import CardUser from '../CardUser/CardUser';
import TitleSection from '../TitleSection/TitleSection';

import styles from './LobbyMembers.module.scss';

interface Props {
  users: Array<Member>;
}

const LobbyMembers: FC<Props> = ({ users }) => (
  <div>
    <TitleSection title={'Members:'} />
    <div className={styles.lobbyPage_section}>
      {users.map((user: Member) => (
        <CardUser
          key={user.userId}
          userId={user.userId}
          firstName={user.firstName}
          lastName={user.lastName}
          jobPosition={user.job}
          role={user.role}
        />
      ))}
      {users.length === 0 && <p>There are no other members yet</p>}
    </div>
  </div>
);

export default LobbyMembers;
