import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

export interface Post {
  id: string;
  title: string;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const initialState: Post[] = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' },
];

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload);
      },
      prepare(title: string, content?: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        };
      },
    },
    removePost(state, action) {
      state.splice(
        state.findIndex((post) => post.id === action.payload),
        1
      );
    },
    postUpdate(state, action: PayloadAction<Post>) {
      const { id, title, content }: Post = action.payload;
      const post = state.find((p) => p.id === id);

      if (post) {
        post.title = title;
        post.content = content;
      }
    },
  },
});

export const { postAdded, removePost, postUpdate } = postSlice.actions;

export default postSlice.reducer;
