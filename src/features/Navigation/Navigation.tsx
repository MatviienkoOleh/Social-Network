import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <ul className={styles.navigation}>
      <li className={styles.navigation_Items}><Link className={styles.navigation_Items_Link} to='/Profile'>Profile</Link></li>
      <li className={styles.navigation_Items}><Link className={styles.navigation_Items_Link} to='/'>Wall</Link></li>
    </ul>
  )
}
