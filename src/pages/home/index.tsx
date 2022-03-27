import React from "react";
import { useSelector } from "react-redux";
import { Post } from "../posts/post-slice";

import styles from "./index.module.css";

export default function Home() {
  const posts = useSelector<any, Post[]>((s) => (s as any).posts);

  return (
    <>
      <div className={styles.block}></div>
      <ul>
        {posts.map((post) => {
          const { id, title, content } = post;
          return (
            <li key={id}>
              <p>{title}</p>
              {content && <p>{content}</p>}
            </li>
          );
        })}
      </ul>
    </>
  );
}
