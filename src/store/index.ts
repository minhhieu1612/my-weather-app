import { configureStore } from '@reduxjs/toolkit';
import queryLocation from './queryLocation';

const store = configureStore({
  reducer: {
    queryLocation
  },
});

export type RootStateType = ReturnType<typeof store.getState>;

export type AppDispatchType = typeof store.dispatch;

export default store;
