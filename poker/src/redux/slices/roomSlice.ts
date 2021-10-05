import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INIT_MEMBER } from '../../constants';
import { Member } from '../../types/common';
import type { RootState } from '../store';

interface roomState {
  currentRoom: string;
  currentUser: Member;
  admin: Member;
  allUsers: Array<Member>;
  isAdmin: boolean;
  isLate: boolean;
}

const initialState: roomState = {
  currentRoom: '',
  currentUser: INIT_MEMBER,
  admin: INIT_MEMBER,
  allUsers: [],
  isAdmin: false,
  isLate: false,
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<Member>) => {
      state.currentUser = action.payload;
    },
    setCurrentRoom: (state, action: PayloadAction<string>) => {
      state.currentRoom = action.payload;
    },
    setIsAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
    setIsLate: (state, action: PayloadAction<boolean>) => {
      state.isLate = action.payload;
    },
    initRoom: (state, action: PayloadAction<Array<Member>>) => {
      const allUsersInRoom = action.payload;
      const currentAdmin = allUsersInRoom.shift();
      if (currentAdmin) {
        state.admin = currentAdmin;
        state.allUsers = allUsersInRoom;
      }
    },
    updateMembers: (state, action: PayloadAction<Member>) => {
      state.allUsers.push(action.payload);
    },
    deleteMember: (state, action: PayloadAction<Member>) => {
      const deletedUser = action.payload;
      state.allUsers = state.allUsers.filter((user) => user.userId !== deletedUser.userId);
    },
  },
});

export const { loginUser, setCurrentRoom, setIsAdmin,
  setIsLate, initRoom, updateMembers, deleteMember } = roomSlice.actions;

export const currentRoomSlice = (state: RootState): string => state.room.currentRoom;
export const currentUserSlice = (state: RootState): Member => state.room.currentUser;
export const adminSlice = (state: RootState): Member => state.room.admin;
export const allUsersSlice = (state: RootState): Array<Member> => state.room.allUsers;
export const isAdminSlice = (state: RootState): boolean => state.room.isAdmin;
export const isLateSlice = (state: RootState): boolean => state.room.isLate;

export default roomSlice.reducer;
