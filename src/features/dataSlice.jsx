import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: false,
    blogs: [],
  },

  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },

    getBlogsSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.blogs=payload.result
    },

    likeBlogSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.blogs=payload.result
    },

    logoutDataSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.blogs=[]
    },
  },
});

export const { fetchStart, fetchFail, getBlogsSuccess, logoutDataSuccess } = dataSlice.actions;

export default dataSlice.reducer;
