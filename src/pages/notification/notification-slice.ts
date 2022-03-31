import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface Notification {
  /** Date ISO string
   * @example '1970-01-01T00:00:00.000Z'
   */
  date: string;
}

const initialState: Notification[] = [];

export const fetchNotifications = createAsyncThunk(
  'notification/fetchNotifications',
  async () => {
    return new Promise<Notification>((resolve) => {
      setTimeout(() => {
        resolve({
          date: new Date().toISOString(),
        });
      }, 1000);
    });
  }
);

const notificationSlice = createSlice({
  initialState,
  name: 'notification',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.push(action.payload);
      state.sort((lhs, rhs) => rhs.date.localeCompare(lhs.date));
    });
  },
});

export default notificationSlice.reducer;
