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
            <img
              src="/images/Arrow 16.svg"
              alt="Arrow icon"
              className={styles.icon}
            />
          </button>
        </div>
        <div className={styles.imageContainer}>
          <img className={styles.image} src="/images/image.jpg" alt="Hero" />
          <div className={`${styles.label} ${styles.label1}`}>
            <img
              src="/images/feCheck.svg"
              alt="Checkmark"
              className={styles.checkmark}
            />
            <div className={styles.column}>
              <p className={styles.labelText}>Experienced psychologists</p>
              <p className={styles.number}>15,000</p>
            </div>
          </div>
          <div className={`${styles.label} ${styles.label2}`}>
            <img
              src="/images/question.svg"
              alt="Checkmark"
              className={styles.checkmark12}
            />
          </div>
          <div className={`${styles.label} ${styles.label3}`}>
            <img
              src="/images/users.svg"
              alt="Checkmark"
              className={styles.checkmark13}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
