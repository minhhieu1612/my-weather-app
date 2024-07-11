import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_LATTITUDE, DEFAULT_LONGTITUDE } from "../utils/config";
import { RootStateType } from ".";

const slice = createSlice({
  name: 'queryLocation',
  initialState: {
    lat: DEFAULT_LATTITUDE,
    lon: DEFAULT_LONGTITUDE
  },
  reducers: {
    setqueryLocationParams: (state, action) => {
      state.lat = action.payload.lat;
      state.lon = action.payload.lon;
    }
  }
})

export const selectQueryLocation = (state: RootStateType) => state.queryLocation

export const { setqueryLocationParams } = slice.actions

export default slice.reducer