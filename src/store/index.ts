import { configureStore } from '@reduxjs/toolkit';

import postsReducer from 'src/pages/posts/post-slice';
import usersReducer from 'src/pages/user/user-slice';
import notificationReducer from 'src/pages/notification/notification-slice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
