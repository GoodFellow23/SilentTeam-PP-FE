import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import TitleSection from '../../components/TitleSection/TitleSection';
import CardIssueGame from '../../components/CardIssueGame/CardIssueGame';
import Card from '../../components/Card/Card';
import { SIZES } from '../../types/common';
import DownloadCSVButton from '../../components/DownloadCSVButton/DownloadCSVButton';
import ExitFromResultPageButton from '../../components/ExitFromResultPageButton/ExitFromResultPageButton';

import { allStatisticsSlice } from '../../redux/slices/statisticsSlice';
import exitToMainPage from '../../utils/exit';

import styles from './ResultsPage.module.scss';

const ResultsPage: FC = () => {
  const history = useHistory();

  const statistics = useSelector(allStatisticsSlice);

  React.useEffect(() => {
    if (statistics.length === 0) {
      history.push('/');
      exitToMainPage();
    }
  });

  return (
    <div className={styles.results_wrapper}>
      <TitleSection title={'Results planning'} isCapitalLetters />

      <div className={styles.results_buttons}>
        <DownloadCSVButton />
        <ExitFromResultPageButton />
      </div>

      {statistics.map((issueStat, index) => (
        <div key={issueStat.issueTitle} className={styles.results_issue_statustics}>
          <CardIssueGame id={String(index)} title={issueStat.issueTitle} />
          <div className={styles.results_cards}>
            {issueStat.statisticsCards
              .filter((cardSelected) => Number(cardSelected.scoreInPercent) > 0)
              .map((cardSelected) => (
                <div key={cardSelected.id} className={styles.results_card_and_result}>
                  <Card card={{ id: cardSelected.id, value: cardSelected.value }} isShowCards size={SIZES.SMALL} />
                  <TitleSection title={`${String(cardSelected.scoreInPercent)}%`} />
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultsPage;
