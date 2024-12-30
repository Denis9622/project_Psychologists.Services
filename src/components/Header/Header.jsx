import { useEffect, useState } from 'react';
import { getCurrentUser, logout } from '../Auth/auth';
import { NavLink } from 'react-router-dom';
import SignIn from '../Signin/SignIn';
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
              <NavLink to="/" className={styles.navLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/catalog" className={styles.navLink}>
                Psychologists
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to="/favorites" className={styles.navLink}>
                  Favorites
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className={styles.userAuth}>
          {user ? (
            <>
              <span className={styles.username}>
                {user.displayName || user.email}
              </span>
              <button onClick={logout} className={styles.linkAuth}>
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
