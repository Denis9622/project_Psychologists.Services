import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/favoritesSlice';
import styles from './Card.module.css'; // Подключаем стили

function Card({ psychologist }) {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.list);
  const isFavorite = favorites.some(fav => fav.id === psychologist.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(psychologist.id));
    } else {
      dispatch(addToFavorites(psychologist));
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={psychologist.avatar_url}
          alt={psychologist.name}
          className={styles.avatar}
        />
        <span className={styles.onlineIndicator}></span>
      </div>
      <div className={styles.details}>
        <div className={styles.headerRow}>
          <div className={styles.titleAndName}>
            <h3 className={styles.title}>Psychologist</h3>
          </div>
          <div className={styles.rating}>
            ⭐ Rating: {psychologist.rating}
            <p className={styles.price}>
              Price/hour: ${psychologist.price_per_hour}
            </p>
            <button
              className={`${styles.favoriteButton} ${
                isFavorite ? styles.favoriteActive : ''
              }`}
              onClick={toggleFavorite}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
        <div>
          <h2 className={styles.name}>{psychologist.name}</h2>
        </div>
        <div className={styles.flexWrap}>
          <p>
            <span className={styles.spanp}>Experience:</span>{' '}
            {psychologist.experience}
          </p>
          <p>
            <span className={styles.spanp}>License:</span>{' '}
            {psychologist.license}
          </p>
          <p>
            <span className={styles.spanp}>Specialization:</span>{' '}
            {psychologist.specialization}
          </p>
          <p>
            <span className={styles.spanp}>Initial Consultation:</span>{' '}
            {psychologist.initial_consultation}
          </p>
        </div>
        <p className={styles.about}>{psychologist.about}</p>
        <button className={styles.readMore}>Read More</button>
      </div>
    </div>
  );
}

export default Card;
