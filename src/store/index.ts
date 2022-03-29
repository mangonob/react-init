import { configureStore } from '@reduxjs/toolkit';

import postsReducer from 'src/pages/posts/post-slice';
import usersReducer from 'src/pages/user/user-slice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
