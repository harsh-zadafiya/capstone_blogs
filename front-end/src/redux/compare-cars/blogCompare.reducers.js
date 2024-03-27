/*
    : Utsavkumar Jayantibhai Italiya - ut437158@dal.ca (B00935447)
*/
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  cars: [],
  compareBlogs: [],
};

const carCompareSlice = createSlice({
  name: "blogCompare",
  initialState: INITIAL_STATE,
  reducers: {
    fetchBlogList(state, { payload }) {
      state.cars = payload;
    },
    addCompareCar(state, action) {
      if (state.compareBlogs.length >= 2) {
        state.compareCars = [];
      }
      state.compareBlogs.push(action.payload);
    },
    removeCompareCar(state, action) {
      state.compareBlogs.splice(state.compareBlogs.indexOf(action.payload), 1);
    },
  },
});

export const { addCompareCar, removeCompareCar, fetchBlogList } =
  carCompareSlice.actions;

export default carCompareSlice.reducer;
