import React from 'react';
import { useUser } from '../posts/hooks';

export default function User(props: { userId: string }) {
  const { userId } = props;

  const user = useUser(userId);

  return user ? <span>{user.name}</span> : <></>;
}
