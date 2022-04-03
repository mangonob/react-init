import { Button, List } from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import ReactiveTime from 'dayjs/plugin/relativeTime';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/store';
import { useAllUsers } from '../posts/hooks';
import styles from './index.module.scss';
import {
  allNotificationRead,
  fetchNotifications,
  Notification,
  selectAllNotifications,
} from './notification-slice';

dayjs.extend(ReactiveTime);

export default function NotificationList() {
  const notifications = useSelector(selectAllNotifications);
  const users = useAllUsers();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(allNotificationRead());
  });

  const renderNotification = (notification: Notification) => {
    const { user: userId, date, message, isNew } = notification;
    const user = users.find((u) => u.id === userId);

    return (
      <List.Item
        className={classNames(styles.notification, { [styles.new]: isNew })}
      >
        <span>
          {user && <b>{user.name}</b>} {message}
        </span>
        <i>{dayjs(date).fromNow()} Ago</i>
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
