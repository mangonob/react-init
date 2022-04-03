import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from 'src/store';
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

const postsAdapter = createEntityAdapter<Post>();

interface PostsState {
  status: PostStatus;
  error?: string;
}

const initialState = postsAdapter.getInitialState<PostsState>({
  status: 'idle',
  error: undefined,
});

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdate({ entities }, action: PayloadAction<Post>) {
      const { id, title, content, user }: Post = action.payload;
      const post = entities[id];

      if (post) {
        post.title = title;
        post.content = content;
        post.user = user;
      }
    },
    reactionPost: {
      reducer({ entities }, action: PayloadAction<[Reaction, string]>) {
        const {
          payload: [reaction, postId],
        } = action;

        const post = entities[postId];
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
    removePost(state, action: PayloadAction<string>) {
      postsAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      postsAdapter.removeAll(state);
      postsAdapter.upsertMany(state, action.payload);
      state.status = 'success';
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      state.entities[action.payload.id] = action.payload;
    });
  },
});

export const { removePost, postUpdate, reactionPost } = postSlice.actions;
export const {
  selectAll: selectAllPost,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors<RootState>((s) => s.posts);

export default postSlice.reducer;
