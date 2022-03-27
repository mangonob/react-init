import { createSlice } from "@reduxjs/toolkit";

export interface Post {
  id: string;
  title: string;
  content?: string;
}

const initialState: Post[] = [
  { id: "1", title: "First Post!", content: "Hello!" },
  { id: "2", title: "Second Post", content: "More text" },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export default postSlice.reducer;
