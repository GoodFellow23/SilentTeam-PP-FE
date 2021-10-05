import { MAX_PERCENT } from '../constants';
import { IssueChatItem, StatisticCard } from '../types/common';

interface TempType {
  value: string;
  count: number;
}

const createCardValueAndCountOfVotesArray = (array: Array<IssueChatItem>): Array<TempType> => array
.reduce((res: Array<TempType>, item) => {
  if (item.value !== '-') {
    const index = res.findIndex((el) => el.value === item.value);
    if (index !== -1) res[index] = { value: item.value, count: res[index].count + 1 };
    else res.push({ value: item.value, count: 1 });
  }

  return res;
}, []);

const updateStatisticsCards = (
  array: Array<StatisticCard>,
  tempArray: Array<TempType>,
  allUsersCount: number,
): void => tempArray.forEach((item) => {
  const index = array.findIndex((el) => el.value === item.value);

  if (index !== -1) array[index].scoreInPercent = Math.round((item.count * MAX_PERCENT) / allUsersCount);
});

const updateStatistics = (
  arrayIssueChat: Array<IssueChatItem>,
  countOfAllUsers: number,
  arrayStatisticsCards: Array<StatisticCard>,
): Array<StatisticCard> => {
  const tempArr = createCardValueAndCountOfVotesArray(arrayIssueChat);

  updateStatisticsCards(arrayStatisticsCards, tempArr, countOfAllUsers);

  return arrayStatisticsCards;
};

export default updateStatistics;
