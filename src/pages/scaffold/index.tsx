import React from 'react';
import { Outlet } from 'react-router';
import NavBar from 'src/components/scaffold/nav-bar';

import styles from './index.module.scss';

export default function Scaffold() {
  return (
    <section className={styles.app}>
      <NavBar />
      <section className={styles.appContent}>
        <Outlet></Outlet>;
      </section>
    </section>
  );
}
