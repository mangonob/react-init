/* eslint-disable unicorn/filename-case */
import { Button } from 'antd';
import React from 'react';
import { Route, Routes } from 'react-router';
import styles from './App.module.scss';
import NavBar from './components/scaffold/nav-bar';
import NotificationList from './pages/notification';
import { SinglePostPage } from './pages/posts';
import EditPost from './pages/posts/edit-post';
import PostList from './pages/posts/post-list';
import { UserDetail } from './pages/user';
import UserList from './pages/user/user-list';

export default function App() {
  return (
    <section className={styles.app}>
      <NavBar />
      <section className={styles.appContent}>
        <Routes>
          <Route path="/" element={<PostList />}></Route>
          <Route path="post/:postId" element={<SinglePostPage />}></Route>
          <Route path="edit/:postId" element={<EditPost />}></Route>
          <Route path="create" element={<EditPost />}></Route>
          <Route path="users" element={<UserList />}></Route>
          <Route path="user/:userId" element={<UserDetail />}></Route>
          <Route path="notifications" element={<NotificationList />}></Route>
          <Route path="*" element={<h2>Page Not Found</h2>}></Route>
        </Routes>
      </section>
      {/* Load antd style */}
      <Button style={{ display: 'none' }}></Button>
    </section>
  );
}
