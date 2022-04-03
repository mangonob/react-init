import faker from '@faker-js/faker';
import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { notification } from 'antd';
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
  isReaded?: boolean;
  isNew?: boolean;
}

const initialState: Notification[] = [];

export const fetchNotifications = createAsyncThunk(
  'notification/fetchNotifications',
  async (_, { getState }) => {
    return new Promise<Notification[]>((resolve) => {
      setTimeout(() => {
        const {
          users,
          notifications: [least],
        } = getState() as RootState;

        const user =
          (users.length > 0 && faker.random.arrayElement(users)) || undefined;

        const notifications = Array.from({
          length: Math.floor(random(1, 5)),
        }).map((): Notification => {
          const date =
            (least && faker.date.future(undefined, new Date(least.date))) ||
            faker.date.future();

          return {
            id: nanoid(),
            date: date.toISOString(),
            message: faker.random.words(7),
            user: user?.id,
            isNew: true,
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
  reducers: {
    allNotificationRead(state) {
      state.forEach((notif) => (notif.isReaded = true));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.forEach((notif) => {
        // Any notifications we've read are no longer new
        notif.isNew = !notif.isReaded;
      });
      state.push(...action.payload);
      state.sort((lhs, rhs) => rhs.date.localeCompare(lhs.date));
    });
  },
});

export default notificationSlice.reducer;

export const { allNotificationRead } = notificationSlice.actions;

export const selectAllNotifications = (state: RootState) => state.notifications;
