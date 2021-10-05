import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardGameSetting, IssueChatItem, Member, ROLES, StatisticCard } from '../../types/common';
import isAllUsersVoted from '../../utils/isAllUsersVoted';
import updateIssueChat from '../../utils/updateIssueChat';
import updateStatistics from '../../utils/updateStatistics';
import type { RootState } from '../store';

interface GameProcessInit {
  issueIdSelected: string;
  currentUserCheckCardWithId: string;
  issueChat: IssueChatItem[];
  isPlayingNow: boolean;
  isShowResultOfVoting: boolean;
  statisticsCards: StatisticCard[];
  isLateModalOpen: boolean;
  lateUser: Member | null;
}

const initialState: GameProcessInit = {
  issueIdSelected: '0',
  currentUserCheckCardWithId: '',
  issueChat: [],
  isPlayingNow: false,
  isShowResultOfVoting: false,
  statisticsCards: [],
  isLateModalOpen: false,
  lateUser: null,
};

export const gameProcessSlice = createSlice({
  name: 'gameProcess',
  initialState,
  reducers: {
    selectedIssue: (state, action: PayloadAction<string>) => {
      state.issueIdSelected = action.payload;
    },
    selectedCard: (state, action: PayloadAction<string>) => {
      state.currentUserCheckCardWithId = action.payload;
    },
    initIssueChat: (state, action: PayloadAction<{ isAdminPlayer: boolean; admin: Member; users: Member[] }>) => {
      const { isAdminPlayer, admin, users } = action.payload;
      const usersFromLobby = [...users];
      if (isAdminPlayer) usersFromLobby.unshift(admin);
      const usersInIssueChat: IssueChatItem[] = usersFromLobby.reduce((res: IssueChatItem[], user) => {
        if (user.role !== ROLES.OBSERVER) res.push({ ...user, value: '-' });
        return res;
      }, []);
      state.issueChat = usersInIssueChat;
    },
    updateIssueChatAndStatistics: (
      state,
      action: PayloadAction<{ userId: string; issueId: string; cardId: string; cardValue: string }>,
    ) => {
      const { userId, issueId, cardValue } = action.payload;
      if (issueId === state.issueIdSelected) {
        const allUsersCount = state.issueChat.length;

        // update issueChat
        const newIssueChat = updateIssueChat(state.issueChat, userId, cardValue);
        state.issueChat = newIssueChat;

        // update statisticsCards
        const newStatisticsCards = updateStatistics(newIssueChat, allUsersCount, state.statisticsCards);
        state.statisticsCards = newStatisticsCards;

        // check if every user voted
        const isAllVoted = isAllUsersVoted(newIssueChat);

        if (isAllVoted) {
          state.isPlayingNow = false;
          state.isShowResultOfVoting = true;
        }
      }
    },
    setIsPlayingNow: (state, action: PayloadAction<boolean>) => {
      state.isPlayingNow = action.payload;
      state.currentUserCheckCardWithId = '';
    },
    setIsShowResultOfVoting: (state, action: PayloadAction<boolean>) => {
      state.isShowResultOfVoting = action.payload;
    },
    initStatisticsCards: (state, action: PayloadAction<Array<CardGameSetting>>) => {
      const cards = action.payload;
      state.statisticsCards = cards.map((card) => ({ ...card, scoreInPercent: 0 }));
    },
    setIsLateModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isLateModalOpen = action.payload;
    },
    setLateUser: (state, action: PayloadAction<Member>) => {
      state.lateUser = action.payload;
    },
  },
});

export const {
  selectedIssue,
  selectedCard,
  initIssueChat,
  updateIssueChatAndStatistics,
  setIsPlayingNow,
  setIsShowResultOfVoting,
  initStatisticsCards,
  setIsLateModalOpen,
  setLateUser
} = gameProcessSlice.actions;

export const issueIdSelectedSlice = (state: RootState): string => state.gameProcess.issueIdSelected;
export const currentUserCheckCardWithIdSlice = (state: RootState): string => state
.gameProcess.currentUserCheckCardWithId;
export const issueChatSlice = (state: RootState): IssueChatItem[] => state.gameProcess.issueChat;
export const statisticsCardsSlice = (state: RootState): StatisticCard[] => state.gameProcess.statisticsCards;
export const isPlayingNowSlice = (state: RootState): boolean => state.gameProcess.isPlayingNow;
export const isShowResultOfVotingSlice = (state: RootState): boolean => state.gameProcess.isShowResultOfVoting;
export const isLateModalOpenSlice = (state: RootState): boolean => state.gameProcess.isLateModalOpen;
export const lateUserSlice = (state: RootState): Member|null => state.gameProcess.lateUser;

export default gameProcessSlice.reducer;
