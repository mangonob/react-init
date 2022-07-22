import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { RootState } from 'src/store';
import { useUser } from '../posts/hooks';
import { Post } from '../posts/post-slice';
import { usePostsByUser } from './hooks';
import { User as IUser } from './user-slice';

export function User(props: { userId: string }) {
  const { userId } = props;

  const user = useUser(userId);

  return user ? <span>{user.name}</span> : <></>;
}

export default function UserDetail() {
  const { userId } = useParams();

  const user = useSelector<RootState, IUser | undefined>((s) =>
    s.users.find((u) => u.id === userId)
  );

  const posts = usePostsByUser(userId);

  const renderPost = (post: Post) => {
    const { title, id } = post;
    return (
      <li key={id}>
        <Link to={`/post/${id}`}>{title}</Link>
      </li>
    );
  };

  if (user) {
    const { name } = user;
    return (
      <section>
        <h2>Posts for {name}</h2>

        {posts.length > 0 && <ul>{posts.map((p) => renderPost(p))}</ul>}
      </section>
    );
  } else {
    return <>User {userId} not found</>;
  }
}
