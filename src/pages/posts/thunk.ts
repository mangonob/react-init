import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { random } from 'lodash';
import { Post } from './post-slice';

/** Async thunk to load posts  */
export const fetchPosts = createAsyncThunk('posts/fetchPosts', _fetchFakePosts);

/**
 * Utils
 */
async function _fetchFakePosts(): Promise<Post[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const posts = Array.from({ length: Math.floor(random(1, 42)) }).map(
        (): Post => {
          return {
            id: nanoid(),
            title: 'New post',
            content: 'New post content',
          };
        }
      );
      resolve(posts);
    }, 200);
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
