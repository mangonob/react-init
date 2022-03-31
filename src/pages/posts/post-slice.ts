import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addNewPost, fetchPosts } from './thunk';

export type Reaction = 'thumbsUp' | 'hooray' | 'heart' | 'rocket' | 'eyes';

export interface Post {
  id: string;
  title: string;
  content?: string;
  /** User id */
  user?: string;
  createdAt?: number;
  updatedAt?: number;
  reactions?: { [key in Reaction]?: number };
}

export type PostStatus = 'idle' | 'loading' | 'success' | 'failed';

export interface PostsState {
  status: PostStatus;
  error?: string;
  posts: Post[];
}

const initialState: PostsState = {
  status: 'idle',
  posts: [
    { id: '1', title: 'First Post!', content: 'Hello!', user: '0' },
    { id: '2', title: 'Second Post', content: 'More text', user: '0' },
  ],
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    removePost({ posts }, action) {
      posts.splice(
        posts.findIndex((post) => post.id === action.payload),
        1
      );
    },
    postUpdate({ posts }, action: PayloadAction<Post>) {
      const { id, title, content, user }: Post = action.payload;
      const post = posts.find((p) => p.id === id);

      if (post) {
        post.title = title;
        post.content = content;
        post.user = user;
      }
    },
    reactionPost: {
      reducer({ posts }, action: PayloadAction<[Reaction, string]>) {
        const {
          payload: [reaction, postId],
        } = action;

        const post = posts.find((p) => p.id === postId);
        if (post) {
          if (post.reactions) {
            post.reactions[reaction] = (post.reactions[reaction] ?? 0) + 1;
          } else {
            post.reactions = { [reaction]: 1 };
          }
        }
      },
      prepare(reaction: Reaction, postId: string) {
        return { payload: [reaction, postId] as [Reaction, string] };
      },
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      state.posts.push(action.payload);
    });
  },
});

export const { removePost, postUpdate, reactionPost } = postSlice.actions;

export default postSlice.reducer;
