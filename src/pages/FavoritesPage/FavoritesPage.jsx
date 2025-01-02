import { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import Filter from '../../components/Filters/Filters';
import Card from '../../components/Card/Card'; 
import styles from './FavoritesPage.module.css';

function FavoritesPage() {
  const { list: favorites } = useSelector(state => state.favorites);

  const [visibleCount, setVisibleCount] = useState(3); 
  const [sortOption, setSortOption] = useState('alphabetical-asc'); 

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 3); 
  };

  const handleSortChange = event => {
    setSortOption(event.target.value);
  };

  const sortedFavorites = favorites.slice().sort((a, b) => {
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

  return (
    <div>
      <Header />
      <div className={styles.favorites}>
        {favorites.length > 0 && (
          <Filter sortOption={sortOption} handleSortChange={handleSortChange} />
        )}
        {favorites.length === 0 ? (
          <div className={styles.noFavorites}>
            <h2>You have no favorite psychologists yet.</h2>
          </div>
        ) : (
          <div className={styles.favoritesList}>
            {sortedFavorites.slice(0, visibleCount).map(favorite => (
              <Card key={favorite.id} psychologist={favorite} />
            ))}
          </div>
        )}
        {favorites.length > 0 && (
          <div className={styles.loadMoreButtonContainer}>
            {visibleCount < sortedFavorites.length && (
              <button onClick={loadMore} className={styles.loadMoreButton}>
                Load More
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;
