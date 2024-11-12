import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/favoritesSlice';
import styles from './Card.module.css';

const Card = ({ camper }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Достаем список избранных кемперов из Redux
  const favorites = useSelector(state => state.favorites.list);

  // Проверяем, находится ли кемпер в избранных
  const isFavorite = favorites.some(fav => fav.id === camper.id);

  // Извлекаем данные с проверками
  const {
    id,
    name,
    price = 0,
    description = '',
    rating = 0,
    location = '',
    gallery = [],
    transmission,
    engine,
    kitchen,
    AC,
  } = camper;
  const imageUrl =
    gallery.length > 0 ? gallery[0].original : '/images/default-image-url.jpg';

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(camper.id));
    } else {
      dispatch(addToFavorites(camper));
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={name} className={styles.image} />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.priceContainer}>
            <p className={styles.price}>{price.toFixed(2)} EUR</p>
            <img
              src={
                isFavorite ? '/images/Heart-filled.svg' : '/images/Heart.svg'
              }
              alt="Heart icon"
              className={styles.heartIcon}
              onClick={handleFavoriteToggle}
            />
          </div>
        </div>

        <div className={styles.ratingContainer}>
          <img
            src="/images/Rating.svg"
            alt="Rating stars"
            className={styles.ratingIcon}
          />
          <span className={styles.rating}>{rating} (2 Reviews)</span>
          <img
            src="/images/Map.svg"
            alt="Map icon"
            className={styles.mapIcon}
          />
          <span className={styles.city}>{location}</span>
        </div>

        <p className={styles.description}>{description}</p>
        <div className={styles.filterSlots}>
          {transmission === 'automatic' && (
            <div className={styles.filterSlot}>
              <img
                src="/images/Automatic.svg"
                alt="Automatic"
                className={styles.filterIcon}
              />
              <span className={styles.filterLabel}>Automatic</span>
            </div>
          )}
          {engine && (
            <div className={styles.filterSlot}>
              <img
                src="/images/petrol.svg"
                alt={engine}
                className={styles.filterIcon}
              />
              <span className={styles.filterLabel}>
                {engine.charAt(0).toUpperCase() + engine.slice(1)}
              </span>
            </div>
          )}
          {kitchen && (
            <div className={styles.filterSlot}>
              <img
                src="/images/Kitchen.svg"
                alt="Kitchen"
                className={styles.filterIcon}
              />
              <span className={styles.filterLabel}>Kitchen</span>
            </div>
          )}
          {AC && (
            <div className={styles.filterSlot}>
              <img
                src="/images/AC.svg"
                alt="AC"
                className={styles.filterIcon}
              />
              <span className={styles.filterLabel}>AC</span>
            </div>
          )}
        </div>

        <button
          onClick={() => navigate(`/catalog/${id}`)}
          className={styles.button}
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default Card;
