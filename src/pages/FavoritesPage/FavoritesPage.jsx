import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './FavoritesPage.module.css';

function FavoritesPage() {
  const navigate = useNavigate();
  const { list: favorites } = useSelector(state => state.favorites);

  if (favorites.length === 0) {
    return (
      <div className={styles.noFavorites}>
        <h2>You have no favorite psychologists yet.</h2>
        <button onClick={() => navigate('/catalog')} className={styles.button}>
          Go to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className={styles.favorites}>
      <h1>Your Favorite Psychologists</h1>
      <div className={styles.favoritesList}>
        {favorites.map(favorite => (
          <div key={favorite.id} className={styles.favoriteItem}>
            <img
              src={favorite.avatar_url}
              alt={favorite.name}
              className={styles.avatar}
            />
            <h3>{favorite.name}</h3>
            <p>{favorite.specialization}</p>
            <p>Rating: {favorite.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
