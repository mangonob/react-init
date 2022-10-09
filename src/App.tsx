/* eslint-disable unicorn/filename-case */
import React from 'react';
import { Route, Routes } from 'react-router';
import { Scaffold } from './pages';
import Animations from './pages/animations';
import NotificationList from './pages/notification';
import Playground from './pages/playground';
import { SinglePostPage } from './pages/posts';
import EditPost from './pages/posts/edit-post';
import PostList from './pages/posts/post-list';
import { UserDetail } from './pages/user';
import UserList from './pages/user/user-list';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Scaffold />}>
        <Route index element={<Playground />} />
        <Route path="posts" element={<PostList />}></Route>
        <Route path="post/:postId" element={<SinglePostPage />}></Route>
        <Route path="edit/:postId" element={<EditPost />}></Route>
        <Route path="create" element={<EditPost />}></Route>
        <Route path="users" element={<UserList />}></Route>
        <Route path="user/:userId" element={<UserDetail />}></Route>
        <Route path="notifications" element={<NotificationList />}></Route>
        <Route path="animations" element={<Animations />}></Route>
        <Route path="playground" element={<Playground />}></Route>
      </Route>
      <Route path="*" element={<h2>Page Not Found</h2>}></Route>
    </Routes>
  );
}
