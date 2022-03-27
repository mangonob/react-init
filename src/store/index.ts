import { configureStore, createSlice } from "@reduxjs/toolkit";

import postsReducer from "src/pages/posts/post-slice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default store;
