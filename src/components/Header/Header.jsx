import { useEffect, useState } from 'react';
import { getCurrentUser, logout } from '../Auth/auth';
import { NavLink, useLocation } from 'react-router-dom';
import SignIn from '../SignIn/Signin';
import SignUp from '../SignUp/SignUp';
import styles from './Header.module.css';

function Header() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isSignInOpen, setSignInOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = getCurrentUser(user => {
      setUser(user);
    });

    if (typeof unsubscribe === 'function') {
      return () => unsubscribe();
    }
  }, []);

  const handleOpenSignUp = () => setSignUpOpen(true);
  const handleCloseSignUp = () => setSignUpOpen(false);

  const handleOpenSignIn = () => setSignInOpen(true);
  const handleCloseSignIn = () => setSignInOpen(false);

  return (
    <>
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
            {user && (
              <li className={styles.link_li}>
                <NavLink
                  to="/favorites"
                  className={`${styles.navLink} ${
                    location.pathname === '/favorites' ? styles.active : ''
                  }`}
                >
                  Favorites
                </NavLink>
              </li>
            )}
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
              <button onClick={handleOpenSignIn} className={styles.linkAuth}>
                <p className={styles.signup}>Log In</p>
              </button>
              <button onClick={handleOpenSignUp} className={styles.linkAuth}>
                <p className={styles.registration}>Registration</p>
              </button>
            </>
          )}
        </div>
      </header>
      {isSignUpOpen && <SignUp onClose={handleCloseSignUp} />}
      {isSignInOpen && <SignIn onClose={handleCloseSignIn} />}
    </>
  );
}

export default Header;
