import { createSelector } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Post, selectAllPost } from '../posts/post-slice';
import { User } from './user-slice';

export function useUser(userId: string | undefined) {
  return useSelector<RootState, User | undefined>(({ users }) =>
    users.find((u) => u.id === userId)
  );
}

/**
 * Select post of user by user id
 * @param userId
 * @returns post of user
 */
export function usePostsByUser(userId: string | undefined) {
  const selectPostsByUser = useMemo(() => {
    return createSelector(
      [selectAllPost, (_, userId: string | undefined) => userId],
      (posts, userId) => posts.filter((p) => p.user === userId)
    );
  }, []);

  return useSelector<RootState, Post[]>((state) =>
    selectPostsByUser(state, userId)
  );
}
