import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardGameSetting as CG } from '../../types/common';
import type { RootState } from '../store';

const initialState: CG[] = [
  { id: '0', value: 'coffeetime' },
  { id: '1', value: '0' },
  { id: '2', value: '1' },
  { id: '3', value: '5' },
  { id: '4', value: '10' },
  { id: '5', value: '20' },
];

export const gameCardsSlice = createSlice({
  name: 'gameCards',
  initialState,
  reducers: {
    createGC: (state, action: PayloadAction<CG>) => {
      state.push(action.payload);
    },
    fixGC: (state, action: PayloadAction<CG>) => state.map((u) => (u.id !== action.payload.id ? u : action.payload)),
    sortGC: (state) => state.sort((a, b) => {
      if (Number(a.value) < Number(b.value)) return -1;
      if (Number(a.value) > Number(b.value)) return 1;
      return 0;
    }),
    removeGC: (state, action: PayloadAction<CG>) => state.filter((u) => u.id !== action.payload.id),
  },
});

export const { createGC, fixGC, sortGC, removeGC } = gameCardsSlice.actions;

// in the file use: `useSelector((state: RootState) => state.value)`
export const selectGameCards = (state: RootState): CG[] => state.gameCards;

export default gameCardsSlice.reducer;
