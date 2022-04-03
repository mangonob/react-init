import { useSelector } from 'react-redux';
import { User } from 'src/pages/user/user-slice';
import { RootState } from 'src/store';
import { Post, selectAllPost, selectPostById } from '../post-slice';

export function usePost(postId?: string): Post | undefined {
  return useSelector<RootState, Post | undefined>((state) => {
    if (postId) {
      return selectPostById(state, postId);
    }
  });
}

export function useAllPosts(): Post[] {
  return useSelector<RootState, Post[]>(selectAllPost);
}

export function useUser(userId?: string): User | undefined {
  return useSelector<RootState, User | undefined>((s) =>
    s.users.find((u) => u.id === userId)
  );
}

export function useAllUsers(): User[] {
  return useSelector<RootState, User[]>((s) => s.users);
}
