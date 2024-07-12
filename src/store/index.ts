import { configureStore } from '@reduxjs/toolkit';
import queryLocation from './queryLocation';
import searchHistory from './searchHistory';

const store = configureStore({
  reducer: {
    queryLocation,
    searchHistory
  },
});

export type RootStateType = ReturnType<typeof store.getState>;

export type AppDispatchType = typeof store.dispatch;

export default store;
