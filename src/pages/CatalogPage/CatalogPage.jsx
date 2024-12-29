import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPsychologistsAsync } from '../../redux/psychologistsSlice';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/favoritesSlice';
import Card from '../../components/Card/Card';
import Header from '../../components/Header/Header';
import styles from './CatalogPage.module.css';

function CatalogPage() {
  const dispatch = useDispatch();
  const {
    list: psychologists,
    loading,
    error,
  } = useSelector(state => state.psychologists);
  const favorites = useSelector(state => state.favorites.list);

  const [visibleCount, setVisibleCount] = useState(3); // Показывать сначала 3 карточки

  useEffect(() => {
    dispatch(fetchPsychologistsAsync()); // Загружаем данные из Firebase
  }, [dispatch]);

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 3); // Увеличиваем количество отображаемых карточек на 3
  };

  const toggleFavorite = psychologist => {
    const isFavorite = favorites.some(fav => fav.id === psychologist.id);
    if (isFavorite) {
      dispatch(removeFromFavorites(psychologist.id));
    } else {
      dispatch(addToFavorites(psychologist));
    }
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  return (
    <div>
      <Header />
      <div className={styles.catalogContainer}>
        <div className={styles.catalogList}>
          <div className={styles.cardList}>
            {psychologists.length > 0 ? (
              psychologists
                .slice(0, visibleCount)
                .map(psychologist => (
                  <Card
                    key={psychologist.id}
                    psychologist={psychologist}
                    isFavorite={favorites.some(
                      fav => fav.id === psychologist.id
                    )}
                    onToggleFavorite={() => toggleFavorite(psychologist)}
                  />
                ))
            ) : (
              <p>Нет психологов для отображения</p>
            )}
          </div>

          {/* Кнопка Load More */}
          {visibleCount < psychologists.length && (
            <button onClick={loadMore} className={styles.loadMoreButton}>
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CatalogPage;
