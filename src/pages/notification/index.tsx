import { Button, List } from 'antd';
import dayjs from 'dayjs';
import ReactiveTime from 'dayjs/plugin/relativeTime';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/store';
import { useAllUsers } from '../posts/hooks';
import {
  fetchNotifications,
  Notification,
  selectAllNotifications,
} from './notification-slice';

dayjs.extend(ReactiveTime);

export default function NotificationList() {
  const notifications = useSelector(selectAllNotifications);
  const users = useAllUsers();
  const dispatch = useDispatch<AppDispatch>();

  const renderNotification = (notification: Notification) => {
    const { user: userId, date, message } = notification;
    const user = users.find((u) => u.id === userId);

    return (
      <List.Item>
        <div>
          {user && <b>{user.name}</b>} {message}
        </div>
        <div>
          <i>{dayjs(date).fromNow()} Ago</i>
        </div>
      </List.Item>
    );
  };

  const onRefresh = useCallback(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <section className="notification-list">
      <h2>
        Notifications: <Button onClick={onRefresh}>Refresh Notification</Button>
      </h2>

      <List
        dataSource={notifications}
        renderItem={(notif) => renderNotification(notif)}
      ></List>
    </section>
  );
}
