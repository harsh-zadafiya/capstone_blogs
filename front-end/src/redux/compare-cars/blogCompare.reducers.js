import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  blogs: [],
  compareBlogs:[]
};

const blogCompareSlice = createSlice({
  name: "blogCompare",
  initialState: INITIAL_STATE,
  reducers: {
    fetchBlogList(state, { payload }) {
      state.blogs = payload;
    },
    addCompareBlog(state, action) {
      if (state.compareBlogs.length >= 2) {
        state.compareBlogs = [];
      }
      state.compareBlogs.push(action.payload);
    },
    removeCompareBlog(state, action) {
      state.compareBlogs.splice(state.compareBlogs.indexOf(action.payload), 1);
    },
  },
});

export const { addCompareBlog, removeCompareBlog, fetchBlogList } =
  blogCompareSlice.actions;

export default blogCompareSlice.reducer;
