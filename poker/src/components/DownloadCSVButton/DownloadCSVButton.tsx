import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { CSVLink } from 'react-csv';
import GeneralButton from '../GeneralButton/GeneralButton';
import { statisticsForDowndoadSlice } from '../../redux/slices/statisticsSlice';

const DownloadCSVButton: FC = () => {
  const statisticsForDowndoad = useSelector(statisticsForDowndoadSlice);

  const headers = [
    { label: 'Issue title', key: 'issueTitle' },
    { label: 'Story type', key: 'storyType' },
    { label: 'Value', key: 'value' },
    { label: 'Score in percent', key: 'scoreInPercent' },
  ];

  return (
    <CSVLink data={statisticsForDowndoad} headers={headers} filename={'data.csv'}>
      <GeneralButton type="button" label={'Download in .csv'} />
    </CSVLink>
  );
};

export default DownloadCSVButton;
