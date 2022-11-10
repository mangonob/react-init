/* eslint-disable unicorn/filename-case */
import loadable from '@loadable/component';
import React from 'react';
import { Route, Routes } from 'react-router';
import { Scaffold } from './pages';
import { SinglePostPage } from './pages/posts';
import { UserDetail } from './pages/user';

const UserList = loadable(() => import('./pages/user/user-list'));
const PostList = loadable(() => import('./pages/posts/post-list'));
const EditPost = loadable(() => import('./pages/posts/edit-post'));
const NotificationList = loadable(() => import('./pages/notification'));
const Animations = loadable(() => import('./pages/animations'));
const Playground = loadable(() => import('./pages/playground'));

export default function App() {
  return (
    <Routes>
      <Route index element={<Playground />} />
      <Route path="/" element={<Scaffold />}>
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
