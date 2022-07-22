/* eslint-disable unicorn/filename-case */
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router';

const PostList = React.lazy(() => import('./pages/posts/post-list'));
const Playground = React.lazy(() => import('./pages/playground'));
const SinglePostPage = React.lazy(() => import('./pages/posts'));
const EditPost = React.lazy(() => import('./pages/posts/edit-post'));
const NotificationList = React.lazy(() => import('./pages/notification'));
const UserDetail = React.lazy(() => import('./pages/user'));
const Animations = React.lazy(() => import('./pages/animations'));
const UserList = React.lazy(() => import('./pages/user/user-list'));
const Scaffold = React.lazy(() => import('./pages/scaffold'));

export default function App() {
  return (
    <Routes>
      <Route index element={suspense(<Playground />)} />
      <Route path="/" element={suspense(<Scaffold />)}>
        <Route path="posts" element={suspense(<PostList />)}></Route>
        <Route
          path="post/:postId"
          element={suspense(<SinglePostPage />)}
        ></Route>
        <Route path="edit/:postId" element={suspense(<EditPost />)}></Route>
        <Route path="create" element={suspense(<EditPost />)}></Route>
        <Route path="users" element={suspense(<UserList />)}></Route>
        <Route path="user/:userId" element={suspense(<UserDetail />)}></Route>
        <Route
          path="notifications"
          element={suspense(<NotificationList />)}
        ></Route>
        <Route path="animations" element={suspense(<Animations />)}></Route>
        <Route path="playground" element={suspense(<Playground />)}></Route>
      </Route>
      <Route path="*" element={<h2>Page Not Found</h2>}></Route>
    </Routes>
  );
}

function suspense(children: React.ReactNode | undefined) {
  return <Suspense fallback="">{children}</Suspense>;
}
