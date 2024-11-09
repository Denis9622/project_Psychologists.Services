import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../../redux/vehiclesSlice';
import Card from '../../components/Card';
import Loader from '../../components/Loader';
import styles from './CatalogPage.module.css';

function CatalogPage() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector(state => state.vehicles);

  useEffect(() => {
    dispatch(fetchCampers({}));
  }, [dispatch]);

  const loadMore = () => {
    dispatch(fetchCampers({ loadMore: true }));
  };

  useEffect(() => {
    console.log('list:', list);
  }, [list]);

  if (loading) {
    return <Loader />;
  }

  if (!Array.isArray(list)) {
    return <div>Error: list is not an array</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Каталог кемперів</h1>
      <div className={styles.cardList}>
        {list.map(camper => (
          <Card key={camper.id} camper={camper} />
        ))}
      </div>
      <button onClick={loadMore} className={styles.button}>
        Load More
      </button>
    </div>
  );
}

export default CatalogPage;
