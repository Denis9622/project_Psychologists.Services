import Header from './../Header/Header';
import HomePage from './../../pages/HomePage/HomePage';
import styles from './Container.module.css';

const Container = () => {
  return (
    <div className={styles.container}>
      <Header />
      <HomePage />
    </div>
  );
};

export default Container;
