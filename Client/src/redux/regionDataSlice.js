import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: InitialState = {
  regions: [],
  selectedRegion: {},
};

const regionDataSlice = createSlice({
  name: "regionData",
  initialState,
  reducers: {
    setRegionData: (state, action) => {
      state.regions = action.payload;
    },
    setSelectedRegion: (state, action) => {
      state.selectedRegion = action.payload;
    },
  },
});

export const { setRegionData, setSelectedRegion } = regionDataSlice.actions;

export default regionDataSlice.reducer;
