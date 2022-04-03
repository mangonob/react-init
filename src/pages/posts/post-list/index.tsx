import {
  MinusCircleOutlined,
  PlusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Button, Spin } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import classNames from 'classnames';
import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from 'src/store';
import { useAllPosts } from '../hooks';
import { Post, PostStatus, removePost } from '../post-slice';
import { fetchPosts } from '../thunk';
import styles from './index.module.scss';

/** Extra values type from FormInstance */
export type FormValues<T> = T extends FormInstance<infer V> ? V : unknown;

export default function PostList() {
  const posts = useAllPosts();
  const postStatus = useSelector<RootState, PostStatus>(
    ({ posts: { status } }) => status
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  const isLoading = postStatus === 'loading';

  return (
    <section className={styles.postList}>
      <h2>
        Posts:
        <Link to="/create">
          <Button className={styles.addPost} icon={<PlusCircleOutlined />}>
            Add Post
          </Button>
        </Link>
        <SyncOutlined
          className={classNames(styles.refresh, {
            [styles.disabled]: isLoading,
          })}
          onClick={() => {
            if (!isLoading) {
              dispatch(fetchPosts());
            }
          }}
        />
      </h2>
      <Spin spinning={isLoading}>
        <ul>
          {posts.map((post) => (
            <_PostItem post={post} key={post.id} />
          ))}
        </ul>
      </Spin>
    </section>
  );
}

function PostItem(props: { post: Post }) {
  const { post } = props;
  const { id, title } = post;

  const dispatch = useDispatch<AppDispatch>();

  return (
    <li>
      <Link to={`/post/${id}`}>{title}</Link>
      <MinusCircleOutlined
        onClick={(e) => {
          e.stopPropagation();
          dispatch(removePost(id));
        }}
        style={{ color: 'red', marginLeft: 8 }}
      />
    </li>
  );
}

const _PostItem = memo(PostItem);
