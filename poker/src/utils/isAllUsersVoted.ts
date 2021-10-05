import { IssueChatItem } from '../types/common';

const isAllUsersVoted = (array: Array<IssueChatItem>): boolean => array.every((el) => el.value !== '-');

export default isAllUsersVoted;
