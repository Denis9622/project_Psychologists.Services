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
    setFilters(newFilters);
  };

  const loadMore = () => {
    dispatch(fetchCampers({ ...filters, loadMore: true }));
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  console.log('list:', list);

  if (!Array.isArray(list)) {
    return <div>Ошибка: список кемперов не является массивом.</div>;
  }

  return (
    <div>
      <Header /> {/* Добавляем Header здесь */}
      <div className={styles.catalogContainer}>
        {/* Блок фильтров слева */}
        <Filters onApplyFilters={handleApplyFilters} />

        {/* Блок каталога справа */}
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
