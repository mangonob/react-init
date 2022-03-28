import React from 'react';
import { Link } from 'react-router-dom';
import styles from './nav-bar.module.scss';

export default function NavBar() {
  return (
    <nav className={styles.navBar}>
      <section>
        <Link to="/">
          <h1>React Redux Demo</h1>
        </Link>
      </section>
    </nav>
  );
}
