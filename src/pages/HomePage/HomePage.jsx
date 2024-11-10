import { useNavigate, NavLink } from 'react-router-dom';
import styles from './HomePage.module.css';
import logo from '/public/images/TravelTrucks.svg';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <header className={styles.header}>
        <div
          onClick={() => navigate('/')}
          className={styles.logo}
          style={{ cursor: 'pointer' }}
        >
          <img
            src={logo}
            alt="TravelTrucks Logo"
            className={styles.logoImage}
          />
        </div>

        <nav className={styles.nav}>
          <ul className={styles.ulclass}>
            <li className={styles.link_li}>
              <NavLink
                exact
                to="/"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
              >
                Home
              </NavLink>
            </li>
            <li className={styles.link_li}>
              <NavLink
                to="/catalog"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
              >
                Catalog
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Campers of your dreams</h1>
          <p className={styles.heroText}>
            You can find everything you want in our catalog
          </p>
          <button
            onClick={() => navigate('/catalog')}
            className={styles.button}
          >
            View Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
