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
      const posts = [
        { id: '1', title: 'First Post!', content: 'Hello!' },
        { id: '2', title: 'Second Post', content: 'More text' },
        { id: '3', title: 'Third Post', content: 'Some others text' },
        { id: '4', title: 'Fourth Post', content: 'Some more text' },
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
