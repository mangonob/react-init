import { MinusCircleOutlined } from "@ant-design/icons";
import { nanoid } from "@reduxjs/toolkit";
import { Button, Input } from "antd";
import dayjs from "dayjs";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post, postAdded, removePost } from "../posts/post-slice";
import styles from "./index.module.css";

export default function Home() {
  const posts = useSelector<any, Post[]>((s) => (s as any).posts);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onAddPost = useCallback(() => {
    dispatch(
      postAdded({
        id: nanoid(),
        title,
        content,
        createdAt: new Date(),
      })
    );
  }, [title, content, dispatch]);

  return (
    <>
      <div className={styles.block}></div>
      <ul>
        {posts.map((post) => {
          const { id, title, content, createdAt } = post;
          return (
            <li key={id}>
              <p>
                {(() => {
                  if (createdAt) {
                    return `${title} @${dayjs(createdAt).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )} `;
                  } else {
                    return title + " ";
                  }
                })()}
                <MinusCircleOutlined
                  className={styles.removeIcon}
                  onClick={() => dispatch(removePost(id))}
                />
              </p>
              {content && <p>{content}</p>}
            </li>
          );
        })}
      </ul>
      <Input value={title} onChange={(e) => setTitle(e.target.value)}></Input>
      <Input.TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></Input.TextArea>
      <Button type="primary" onClick={onAddPost}>
        Add Post
      </Button>
    </>
  );
}
