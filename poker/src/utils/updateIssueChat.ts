import { IssueChatItem } from '../types/common';

const updateIssueChat = (array: Array<IssueChatItem>, userId: string, cardValue: string): Array<IssueChatItem> => array
.map((item) => {
  if (item.userId === userId) return { ...item, value: cardValue };
  return item;
});

export default updateIssueChat;
