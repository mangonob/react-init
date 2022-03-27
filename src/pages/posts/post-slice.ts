import { createSlice } from "@reduxjs/toolkit";

export interface Post {
  id: string;
  title: string;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const initialState: Post[] = [
  { id: "1", title: "First Post!", content: "Hello!" },
  { id: "2", title: "Second Post", content: "More text" },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded(state, action) {
      state.push(action.payload);
    },
    removePost(state, action) {
      state.splice(
        state.findIndex((post) => post.id === action.payload),
        1
      );
    },
  },
});

export const { postAdded, removePost } = postSlice.actions;

export default postSlice.reducer;
