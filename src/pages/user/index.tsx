import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { User } from 'src/pages/user/user-slice';

export default function User(props: { userId: string }) {
  const { userId } = props;

  const user = useSelector<RootState, User | undefined>((s) =>
    s.users.find((u) => u.id === userId)
  );

  return user ? <span>{user.name}</span> : <></>;
}
