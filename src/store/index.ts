import { configureStore, createSlice } from "@reduxjs/toolkit";

export default configureStore({
  reducer: counterReducer,
});

export type Action =
  | {
      type: "increment";
    }
  | {
      type: "decrement";
    };

function counterReducer(state = 0, action: Action) {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
}

const slice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (s) => {
      s.value += 1;
    },
    decrement: (s) => {
      s.value -= 1;
    },
  },
});
