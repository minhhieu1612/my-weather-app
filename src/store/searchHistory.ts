import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from '.';
import { LocationType } from 'src/types';

const LS_SEARCH_HISTORY_KEY = 'searchHistory';

const slice = createSlice({
  name: 'searchHistory',
  initialState:
    (JSON.parse(
      localStorage.getItem(LS_SEARCH_HISTORY_KEY) as string
    ) as LocationType[]) || [],
  reducers: {
    unshift: (state, action: PayloadAction<LocationType>) => {
      state.unshift(action.payload)
      localStorage.setItem(
        LS_SEARCH_HISTORY_KEY,
        JSON.stringify(state)
      );
    },

    removeIndex: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1)
      localStorage.setItem(
        LS_SEARCH_HISTORY_KEY,
        JSON.stringify(state)
      );
    },
  },
});

export const selectSearchHistory = (state: RootStateType) =>
  state.searchHistory;

export const { unshift: pushSearchHistory, removeIndex: deleteSearchHistory } = slice.actions;

export default slice.reducer;
