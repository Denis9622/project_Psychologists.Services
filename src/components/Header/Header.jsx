// components/Header.jsx
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../assets/images/TravelTrucks.svg'; // Шлях до вашого логотипу

function Header() {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}>
        <img src={logo} alt="TravelTrucks Logo" className={styles.logoImage} />
      </a>
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
              Catalog
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
