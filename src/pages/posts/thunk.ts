import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from './post-slice';

/** Async thunk to load posts  */
export const fetchPosts = createAsyncThunk('posts/fetchPosts', _fetchFakePosts);

/**
 * Utils
 */
async function _fetchFakePosts(): Promise<Post[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const posts: Post[] = [
        { id: '1', title: 'First Post!', content: 'Hello!', user: '1' },
        { id: '2', title: 'Second Post', content: 'More text', user: '1' },
        {
          id: '3',
          title: 'Third Post',
          content: 'Some others text',
          user: '1',
        },
        { id: '4', title: 'Fourth Post', content: 'Some more text', user: '0' },
        { id: '5', title: 'Fifth Post', content: 'More more text' },
        { id: '6', title: 'Sixth Post', content: 'Some more more text' },
      ];
      resolve(posts);
    }, 1000);
  });
}

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (post: Post): Promise<Post> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(post);
      }, 1000);
    });
  }
);
