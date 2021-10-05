import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Issue } from '../../types/common';
import type { RootState } from '../store';

interface IssueState {
  issues: Issue[];
}

const initialState: IssueState = {
  issues: [],
};

export const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    setIssues: (state, action: PayloadAction<Array<Issue>>) => {
      state.issues = action.payload;
    },
    createIs: (state, action: PayloadAction<Issue>) => {
      state.issues.push(action.payload);
    },
    fixIs: (state, action: PayloadAction<Issue>) => {
      state.issues = state.issues.map((u) => (u.id !== action.payload.id ? u : action.payload));
    },
    removeIs: (state, action: PayloadAction<Issue>) => {
      state.issues = state.issues.filter((u) => u.id !== action.payload.id);
    },
  },
});

export const { setIssues, createIs, fixIs, removeIs } = issuesSlice.actions;

export const selectIssues = (state: RootState): Issue[] => state.issues.issues;

export default issuesSlice.reducer;
