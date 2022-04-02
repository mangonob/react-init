import faker from '@faker-js/faker';
import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { random } from 'lodash';
import { RootState } from 'src/store';

export interface Notification {
  id: string;
  /** Date ISO string
   * @example '1970-01-01T00:00:00.000Z'
   */
  date: string;
  user?: string;
  message: string;
}

const initialState: Notification[] = [];

export const fetchNotifications = createAsyncThunk(
  'notification/fetchNotifications',
  async () => {
    return new Promise<Notification[]>((resolve) => {
      setTimeout(() => {
        const notifications = Array.from({
          length: Math.floor(random(1, 10)),
        }).map((): Notification => {
          return {
            id: nanoid(),
            date: faker.date.past().toISOString(),
            message: faker.random.words(7),
          };
        });
        resolve(notifications);
      }, 250);
    });
  }
);

const notificationSlice = createSlice({
  initialState,
  name: 'notification',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.push(...action.payload);
      state.sort((lhs, rhs) => rhs.date.localeCompare(lhs.date));
    });
  },
});

export default notificationSlice.reducer;

export const selectAllNotifications = (state: RootState) => state.notifications;
