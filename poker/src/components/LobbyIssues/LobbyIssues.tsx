import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import TitleSection from '../TitleSection/TitleSection';
import CardIssue from '../CardIssue/CardIssue';
import { selectIssues } from '../../redux/slices/issuesSlice';

import styles from './LobbyIssues.module.scss';

const LobbyIssues: FC = () => {
  const issues = useSelector(selectIssues);
  const len = issues.length;
  const newIssue = {
    id: len > 0 ? (Number(issues[len - 1].id) + 1).toString() : '0',
    title: '',
    desc: '',
  };

  return (
    <div>
      <TitleSection title={'Issues:'} />
      <div className={styles.lobbyPage_section}>
        {len > 0 && issues.map((issue) => <CardIssue key={issue.id} issue={issue} />)}
        <CardIssue issue={newIssue} isNew />
      </div>
    </div>
  );
};

export default LobbyIssues;
