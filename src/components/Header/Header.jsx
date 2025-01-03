import { useEffect, useState } from 'react';
import { getCurrentUser, logout } from '../Auth/auth';
import { NavLink } from 'react-router-dom';
import SignIn from '../Sign/Sign';
import SignUp from '../SignUp/SignUp';
import styles from './Header.module.css';

function Header() {
  const [user, setUser] = useState(null);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isSignInOpen, setSignInOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = getCurrentUser(user => {
      setUser(user);
    });
    return () => unsubscribe && unsubscribe();
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
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? styles.navLinkActive : styles.navLink
                }
              >
                Home
                <img
                  src="/images/iconmenu.svg"
                  alt="Checkmark"
                  className={styles.iconActive}
                />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/catalog"
                className={({ isActive }) =>
                  isActive ? styles.navLinkActive : styles.navLink
                }
              >
                Psychologists
                <img
                  src="/images/iconmenu.svg"
                  alt="Checkmark"
                  className={styles.iconActive}
                />
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink
                  to="/favorites"
                  className={({ isActive }) =>
                    isActive ? styles.navLinkActive : styles.navLink
                  }
                >
                  Favorites
                  <img
                    src="/images/iconmenu.svg"
                    alt="Checkmark"
                    className={styles.iconActive}
                  />
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className={styles.userAuth}>
          {user ? (
            <>
              <div className={styles.userIconContainer}>
                <img
                  src="/images/iconauth.svg"
                  alt="User Icon"
                  className={styles.userIcon}
                />
              </div>
              <span className={styles.username}>
                {user.displayName || user.email}
              </span>
              <button
                onClick={logout}
                className={`${styles.linkAuth} ${styles.logoutButton}`}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={handleOpenSignIn} className={styles.linkAuth}>
                Log In
              </button>
              <button onClick={handleOpenSignUp} className={styles.linkAuth}>
                Registration
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
