import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  blogs: []
};

const blogListingSlice = createSlice({
  name: "blogListing",
  initialState: INITIAL_STATE,
  reducers: {
    addBlogDetails(state, { payload }) {
      state.blogs.push(payload);
    },
    fetchBlogListingsSuccesss(state, { payload }) {
      state.blogs = payload;
    },
    addBlogToFav(state, action) {
      state.blogs.forEach((blog, i) => {
        if (blog.vin === action.payload.vin) {
          state.blogs[i].favourite = !state.blogs[i].favourite;
        }
      });
    },
    updateBlogListings(state, { payload }) {
      state.blogs = state.blogs.map((blog) => {
        if (blog.vin === payload.vin) {
          return payload;
        } else {
          return blog;
        }
      });
    },
    deleteBlogListings(state, { payload }) {
      state.blogs = state.blogs.filter((blog) => blog.vin !== payload.vin);
    },
  },
});

export const {
  addBlogDetails,
  addBlogToFav,
  fetchBlogListingsSuccesss,
  updateBlogListings,
  deleteBlogListings,
} = blogListingSlice.actions;

// export default carListingSlice.reducer;
export default blogListingSlice.reducer;
