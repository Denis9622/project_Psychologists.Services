import { useNavigate } from 'react-router-dom';
import Header from './../../components/Header/Header';
import styles from './HomePage.module.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />

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
