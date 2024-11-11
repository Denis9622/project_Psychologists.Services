import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../../redux/vehiclesSlice';
import Card from '../../components/Card/Card';
import Loader from '../../components/Loader/Loader';
import Filters from '../../components/Filters/Filters';
import styles from './CatalogPage.module.css';
import Header from '../../components/Header/Header';

function CatalogPage() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector(state => state.vehicles);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    dispatch(fetchCampers(filters));
  }, [dispatch, filters]);

  const handleApplyFilters = newFilters => {
    setFilters(newFilters); // Устанавливаем фильтры
    console.log('Applied filters:', newFilters);
  };

  const loadMore = () => {
    dispatch(fetchCampers({ ...filters, loadMore: true }));
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  if (!Array.isArray(list)) {
    return (
      <div className={styles.error}>
        Ошибка: список кемперов не является массивом.
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className={styles.catalogContainer}>
        <Filters onApplyFilters={handleApplyFilters} />
        <div className={styles.catalogList}>
          <div className={styles.cardList}>
            {list.map(camper => (
              <Card key={camper.id} camper={camper} />
            ))}
          </div>
          <button onClick={loadMore} className={styles.loadMoreButton}>
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}

export default CatalogPage;
