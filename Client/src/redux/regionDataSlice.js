import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: InitialState = {
  regions: [],
  selectedRegionData: {},
};

const regionDataSlice = createSlice({
  name: "regionData",
  initialState,
  reducers: {
    getRegionData: (state, action) => {
      state.regions = action.payload;
    },
    setSelectedRegionData: (state, action) => {
      state.selectedRegionData = action.payload;
    },
  },
});

export const { getRegionData, setSelectedRegionData } = regionDataSlice.actions;

export default regionDataSlice.reducer;
