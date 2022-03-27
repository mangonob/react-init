import React from "react";
import { Route, Routes } from "react-router";
import { SinglePostPage } from "./pages/posts";
import { Button } from "antd";
import PostList from "./pages/posts/post-list";
import NavBar from "./components/scaffold/nav-bar";

import styles from "./App.module.scss";
import EditPost from "./pages/posts/edit-post";

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
          <Route path="*" element={<h2>Page Not Found</h2>}></Route>
        </Routes>
      </section>
      {/* Load antd style */}
      <Button style={{ display: "none" }}></Button>
    </section>
  );
}
