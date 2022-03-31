import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'src/store';
import { User } from './user-slice';

export default function UserList() {
  const users: User[] = useSelector<RootState, User[]>((s) => s.users);

  const renderUser = (user: User) => {
    const { id, name } = user;

    return (
      <li key={id}>
        <Link to={`/user/${id}`}>{name}</Link>
      </li>
    );
  };

  return (
    <section>
      <h2>Users</h2>

      <ul>{users.map((user) => renderUser(user))}</ul>
    </section>
  );
}
