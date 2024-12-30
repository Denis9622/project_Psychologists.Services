import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPsychologistsAsync } from '../../redux/psychologists/psychologistsSlice';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/favorites/favoritesSlice';
import Card from '../../components/Card/Card';
import Header from '../../components/Header/Header';
import Filter from '../../components/Filters/Filters';
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
  const [sortOption, setSortOption] = useState('alphabetical-asc'); // Начальный вариант сортировки

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

  const handleSortChange = event => {
    setSortOption(event.target.value);
  };

  const sortedPsychologists = psychologists.slice().sort((a, b) => {
    switch (sortOption) {
      case 'alphabetical-asc':
        return a.name.localeCompare(b.name);
      case 'alphabetical-desc':
        return b.name.localeCompare(a.name);
      case 'price-asc':
        return a.price_per_hour - b.price_per_hour;
      case 'price-desc':
        return b.price_per_hour - a.price_per_hour;
      case 'popularity-asc':
        return a.rating - b.rating;
      case 'popularity-desc':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

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
        <Filter sortOption={sortOption} handleSortChange={handleSortChange} />
        <div className={styles.catalogList}>
          <div className={styles.cardList}>
            {sortedPsychologists.length > 0 ? (
              sortedPsychologists
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
          {visibleCount < sortedPsychologists.length && (
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
