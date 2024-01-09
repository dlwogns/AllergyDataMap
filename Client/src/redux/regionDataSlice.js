import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: InitialState = {
  regions: [],
};

const regionDataSlice = createSlice({
  name: "regionData",
  initialState,
  reducers: {
    setRegionData: (state, action) => {
      state.regions = action.payload;
    },
  },
});

export const { setRegionData } = regionDataSlice.actions;

export default regionDataSlice.reducer;
