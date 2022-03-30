import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

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

export interface PostsState {
  status: 'idle' | 'loading' | 'successed' | 'failed';
  error?: string;
  posts: Post[];
}

const initialState: PostsState = {
  status: 'idle',
  posts: [
    { id: '1', title: 'First Post!', content: 'Hello!' },
    { id: '2', title: 'Second Post', content: 'More text' },
  ],
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.posts.push(action.payload);
      },
      prepare(title: string, content?: string, user?: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user,
            createdAt: Date.now(),
          },
        };
      },
    },
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
});

export const { postAdded, removePost, postUpdate, reactionPost } =
  postSlice.actions;

export default postSlice.reducer;
