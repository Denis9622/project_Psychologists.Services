import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import logo from '/public/images/TravelTrucks.svg'; // Путь к вашему SVG логотипу

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <header className={styles.header}>
        <a href="/" className={styles.logo}>
          <img
            src={logo}
            alt="TravelTrucks Logo"
            className={styles.logoImage}
          />
        </a>
        <nav className={styles.nav}>
          <ul className={styles.ulclass}>
            <li className={styles.link_li}>
              <a href="/" className={styles.navLink}>
                Home
              </a>
            </li>
            <li className={styles.link_li}>
              <a href="/catalog" className={styles.navLink}>
                Catalog
              </a>
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
