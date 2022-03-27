import React from "react";
import { useSelector } from "react-redux";
import { Post } from "../posts/post-slice";

export default function Home() {
  const posts = useSelector<any, Post[]>((s) => (s as any).posts);

  return (
    <ul>
      {posts.map((post) => {
        const { title, content } = post;
        return (
          <li>
            <p>{title}</p>
            {content && <p>{content}</p>}
          </li>
        );
      })}
    </ul>
  );
}
