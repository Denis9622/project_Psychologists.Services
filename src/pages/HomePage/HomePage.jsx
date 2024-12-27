import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            The road to the <span className={styles.logospan}>depths</span> of
            the human soul
          </h1>
          <p className={styles.heroText}>
            We help you to reveal your potential, overcome challenges and find a
            guide in your own life with the help of our experienced
            psychologists.
          </p>
          <button
            onClick={() => navigate('/catalog')}
            className={styles.button}
          >
            Get started
          </button>
        </div>
        <div>
          <img
            className={styles.image}
            src="../../../public/images/image.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
