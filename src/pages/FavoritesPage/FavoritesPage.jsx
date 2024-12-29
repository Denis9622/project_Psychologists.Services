import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import styles from './FavoritesPage.module.css';

function FavoritesPage() {
  const navigate = useNavigate();
  const { list: favorites } = useSelector(state => state.favorites);

  const [visibleCount, setVisibleCount] = useState(3); // Показывать сначала 3 карточки

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 3); // Увеличиваем количество отображаемых карточек на 3
  };

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
    <div>
      <Header />
      <div className={styles.favorites}>
        <h1>Your Favorite Psychologists</h1>
        <div className={styles.favoritesList}>
          {favorites.slice(0, visibleCount).map(favorite => (
            <div key={favorite.id} className={styles.card}>
              <div className={styles.imageContainer}>
                <img
                  src={favorite.avatar_url}
                  alt={favorite.name}
                  className={styles.avatar}
                />
                <span className={styles.onlineIndicator}></span>
              </div>
              <div className={styles.details}>
                <div className={styles.headerRow}>
                  <div className={styles.titleAndName}>
                    <h3 className={styles.title}>Psychologist</h3>
                    <h2 className={styles.name}>{favorite.name}</h2>
                  </div>
                  <div className={styles.rating}>
                    ⭐ Rating: {favorite.rating}
                  </div>
                </div>
                <div className={styles.flexWrap}>
                  <p>
                    <span className={styles.spanp}>Specialization:</span>{' '}
                    {favorite.specialization}
                  </p>
                </div>
                <p className={styles.about}>{favorite.about}</p>
                <button
                  className={styles.readMore}
                  onClick={() => navigate(`/catalog/${favorite.id}`)}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Кнопка Load More */}
        {visibleCount < favorites.length && (
          <button onClick={loadMore} className={styles.loadMoreButton}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;
