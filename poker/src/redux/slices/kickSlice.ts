import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INIT_MEMBER } from '../../constants';
import { Member } from '../../types/common';
import type { RootState } from '../store';

interface KickState {
  isModalOpen: boolean;
  isModalOpenBySocketEvent: boolean;
  whoWillBeKicked: Member;
  whoKick: Member;
  kickId: string;
}

const initialState: KickState = {
  isModalOpen: false,
  isModalOpenBySocketEvent: false,
  whoWillBeKicked: INIT_MEMBER,
  whoKick: INIT_MEMBER,
  kickId: '',
};

export const kickSlice = createSlice({
  name: 'kick',
  initialState,
  reducers: {
    setIsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    setIsModalOpenBySocketEvent: (state, action: PayloadAction<boolean>) => {
      state.isModalOpenBySocketEvent = action.payload;
    },
    setWhoWillBeKicked: (state, action: PayloadAction<Member>) => {
      state.whoWillBeKicked = action.payload;
    },
    setWhoKick: (state, action: PayloadAction<Member>) => {
      state.whoKick = action.payload;
    },
    setKickId: (state, action: PayloadAction<string>) => {
      state.kickId = action.payload;
    },
  },
});

export const { setIsModalOpen, setIsModalOpenBySocketEvent, setWhoWillBeKicked, setWhoKick, setKickId }
  = kickSlice.actions;

export const isModalOpenSlice = (state: RootState): boolean => state.kick.isModalOpen;
export const isModalOpenBySocketEventSlice = (state: RootState): boolean => state.kick.isModalOpenBySocketEvent;
export const whoWillBeKickedSlice = (state: RootState): Member => state.kick.whoWillBeKicked;
export const whoKickSlice = (state: RootState): Member => state.kick.whoKick;
export const kickIdSlice = (state: RootState): string => state.kick.kickId;

export default kickSlice.reducer;
