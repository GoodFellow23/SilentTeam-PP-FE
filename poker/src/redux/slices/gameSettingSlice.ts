import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { GameSettingsInit, SettingsFromServer } from '../../types/common';

const initialState: GameSettingsInit = {
  masterIsPlayer: true,
  isNeededTimer: true,
  storyType: 'story type',
  storyTypeShort: 'ST',
  roundTime: 60,
  minGameCardValue: 0,
  maxGameCardValue: 1000,
};

export const gameSettingSlice = createSlice({
  name: 'gameConfig',
  initialState,
  reducers: {
    changeMasterIsPlayer: (state) => {
      const isPlayer = !state.masterIsPlayer;
      return { ...state, masterIsPlayer: isPlayer };
    },
    changeIsNeededTimer: (state) => {
      const isNeeded = !state.isNeededTimer;
      return { ...state, isNeededTimer: isNeeded };
    },
    changeStoryType: (state, action: PayloadAction<string>) => {
      state.storyType = action.payload;
    },
    changeStoryTypeShort: (state, action: PayloadAction<string>) => {
      state.storyTypeShort = action.payload
        .split(' ')
        .map((u, i) => (u.length > 0 && i < 3 ? u[0].toUpperCase() : ''))
        .join('');
    },
    changeRoundTime: (state, action: PayloadAction<number>) => {
      state.roundTime = action.payload;
    },
    setSettings: (state, action: PayloadAction<SettingsFromServer>) => {
      const { isAdminBePlayerInGame, isNeededTimer, storyTypeShort, roundTime } = action.payload;
      return { ...state, masterIsPlayer: isAdminBePlayerInGame, isNeededTimer, storyTypeShort, roundTime };
    },
  },
});

export const {
  changeMasterIsPlayer,
  changeIsNeededTimer,
  changeStoryType,
  changeStoryTypeShort,
  changeRoundTime,
  setSettings,
} = gameSettingSlice.actions;

export const selectGameSetting = (state: RootState): GameSettingsInit => state.gameSettings;

export default gameSettingSlice.reducer;
