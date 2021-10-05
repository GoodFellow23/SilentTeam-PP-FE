import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Issue,
  StatisticsForDownloadItem,
  StatisticsResultItem,
  StatisticsResultItemFromServer,
} from '../../types/common';
import type { RootState } from '../store';

interface StatisticsState {
  statistics: Array<StatisticsResultItem>;
  statisticsForDowndoad: Array<StatisticsForDownloadItem>;
}

const initialState: StatisticsState = {
  statistics: [],
  statisticsForDowndoad: [],
};

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    initStatistics: (
      state,
      action: PayloadAction<{
        responseStatistics: StatisticsResultItemFromServer[];
        issues: Issue[];
        storyType: string;
      }>,
    ) => {
      // set statistics
      const { responseStatistics, issues, storyType } = action.payload;
      const newStatistics = responseStatistics.map((item) => {
        const index = issues.findIndex((issue) => issue.id === item.issueId);
        return {
          issueTitle: issues[index].title,
          statisticsCards: item.results,
        };
      });

      state.statistics = newStatistics;

      // set statisticsForDowndoad
      const newStatisticsForDowndoad: Array<StatisticsForDownloadItem> = [];
      newStatistics.forEach((item) => {
        item.statisticsCards.forEach((el) => newStatisticsForDowndoad.push({
          issueTitle: item.issueTitle,
          storyType,
          value: el.value,
          scoreInPercent: el.scoreInPercent,
        }),);
      });

      state.statisticsForDowndoad = newStatisticsForDowndoad;
    },
  },
});
export const { initStatistics } = statisticsSlice.actions;

export const allStatisticsSlice = (state: RootState): Array<StatisticsResultItem> => state.statistics.statistics;

export const statisticsForDowndoadSlice = (state: RootState): Array<StatisticsForDownloadItem> => state.statistics
.statisticsForDowndoad;

export default statisticsSlice.reducer;
