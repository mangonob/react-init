import { NotificationOutlined } from '@ant-design/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchNotifications } from 'src/pages/notification/notification-slice';
import { RootState } from 'src/store';
import styles from './nav-bar.module.scss';

export default function NavBar() {
  const unreadCount = useSelector<RootState, number>(
    (s) => s.notifications.filter((e) => !e.isReaded).length
  );
  const dispatch = useDispatch();

  return (
    <nav className={styles.navBar}>
      <section>
        <Link to="/">
          <h1>React Redux Demo</h1>
        </Link>
        {unreadCount > 0 && (
          <Link to="/notifications">
            <h2 className={styles.unread}>{unreadCount}</h2>
          </Link>
        )}
        <NotificationOutlined
          className={styles.notif}
          onClick={() => {
            dispatch(fetchNotifications());
          }}
        />
      </section>
    </nav>
  );
}
