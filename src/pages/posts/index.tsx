import { EditOutlined } from '@ant-design/icons';
import { paramCase } from 'change-case';
import classNames from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { RootState } from 'src/store';
import styles from './index.module.scss';
import { Post } from './post-slice';

export function SinglePostPage() {
  const params = useParams();

  const { postId } = params;

  const post = useSelector<RootState, Post | undefined>((state) =>
    state.posts.find((post) => post.id === postId)
  );

  if (!post) {
    return (
      <section>
        <h2>Post {postId} Not Found</h2>
      </section>
    );
  } else {
    const { id, title, content } = post;

    return (
      <section>
        <article
          className={classNames(styles.post, paramCase(`post-${postId}`))}
        >
          <h2>
            {title}{' '}
            <Link to={`/edit/${id}`}>
              <EditOutlined />
            </Link>
          </h2>
          {content && <p className={styles.postContent}>{content}</p>}
        </article>
      </section>
    );
  }
}
