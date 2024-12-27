import { useEffect, useState } from 'react';
import { getCurrentUser, logout } from '../Auth/auth'; // Убедитесь, что путь правильный
import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = getCurrentUser(user => {
      setUser(user);
    });

    // Проверьте, что unsubscribe является функцией
    if (typeof unsubscribe === 'function') {
      return () => unsubscribe();
    }
  }, []);

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <a href="/">
          <span className={styles.logospan}>psychologists.</span>services
        </a>
      </h1>

      <nav className={styles.nav}>
        <ul className={styles.ulclass}>
          <li className={styles.link_li}>
            <NavLink
              to="/"
              className={`${styles.navLink} ${
                location.pathname === '/' ? styles.active : ''
              }`}
            >
              Home
            </NavLink>
          </li>
          <li className={styles.link_li}>
            <NavLink
              to="/catalog"
              className={`${styles.navLink} ${
                location.pathname === '/catalog' ? styles.active : ''
              }`}
            >
              Psychologists
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.userAuth}>
        {user ? (
          <>
            <span className={styles.username}>{user.email}</span>
            <button onClick={logout} className={styles.linkAuth}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signin" className={styles.linkAuth}>
              <p className={styles.signup}>Log In</p>
            </Link>
            <Link to="/signup" className={styles.linkAuth}>
              <p className={styles.registration}>Registration</p>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
