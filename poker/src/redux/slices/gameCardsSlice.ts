import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardGameSetting as CG } from '../../types/common';
import type { RootState } from '../store';

interface GameCardsState {
  cards: CG[];
}

const initialState: GameCardsState = {
  cards: [
    { id: '0', value: 'coffeetime' },
    { id: '1', value: '0' },
    { id: '2', value: '1' },
    { id: '3', value: '5' },
    { id: '4', value: '10' },
    { id: '5', value: '20' },
  ],
};

export const gameCardsSlice = createSlice({
  name: 'gameCards',
  initialState,
  reducers: {
    setGameCards: (state, action: PayloadAction<Array<CG>>) => {
      state.cards = action.payload;
    },
    createGC: (state, action: PayloadAction<CG>) => {
      state.cards.push(action.payload);
    },
    fixGC: (state, action: PayloadAction<CG>) => {
      state.cards = state.cards.map((u) => (u.id !== action.payload.id ? u : action.payload));
    },
    sortGC: (state) => {
      state.cards.sort((a, b) => {
        if (Number(a.value) < Number(b.value)) return -1;
        if (Number(a.value) > Number(b.value)) return 1;
        return 0;
      });
    },
    removeGC: (state, action: PayloadAction<CG>) => {
      state.cards = state.cards.filter((u) => u.id !== action.payload.id);
    },
  },
});

export const { setGameCards, createGC, fixGC, sortGC, removeGC } = gameCardsSlice.actions;

export const selectGameCards = (state: RootState): CG[] => state.gameCards.cards;

export default gameCardsSlice.reducer;
