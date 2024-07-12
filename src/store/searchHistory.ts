import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_LATTITUDE, DEFAULT_LONGTITUDE } from '../utils/config';
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
    setSearchHistory: (state, action: PayloadAction<LocationType[]>) => {
      localStorage.setItem(
        LS_SEARCH_HISTORY_KEY,
        JSON.stringify(action.payload)
      );
      state = action.payload;
    },
  },
});

export const selectSearchHistory = (state: RootStateType) =>
  state.searchHistory;

export const { setSearchHistory } = slice.actions;

export default slice.reducer;
