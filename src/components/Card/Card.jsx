import { useNavigate } from 'react-router-dom';
import styles from './Card.module.css';

const Card = ({ camper }) => {
  const navigate = useNavigate();

  const { id, name, price, description, rating, location, gallery } = camper;
  const imageUrl =
    gallery && gallery.length > 0
      ? gallery[0].original
      : '/images/default-image-url.jpg'; // Путь к изображению по умолчанию из папки public

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
              src="/images/Heart.svg" // Путь к изображению из папки public
              alt="Heart icon"
              className={styles.heartIcon}
            />
          </div>
        </div>

        <div className={styles.ratingContainer}>
          <img
            src="/images/Rating.svg" // Путь к изображению из папки public
            alt="Rating stars"
            className={styles.ratingIcon}
          />
          <span className={styles.rating}>{rating} (2 Reviews)</span>
          <img
            src="/images/Map.svg" // Путь к изображению из папки public
            alt="Map icon"
            className={styles.mapIcon}
          />
          <span className={styles.city}>{location}</span>
        </div>

        <p className={styles.description}>{description}</p>

        <div className={styles.filterSlots}>
          <div className={styles.filterSlot}>
            <img
              src="/images/Automatic.svg" // Путь к изображению из папки public
              alt="Automatic"
              className={styles.filterIcon}
            />
            <span className={styles.filterLabel}>Automatic</span>
          </div>
          <div className={styles.filterSlot}>
            <img
              src="/images/Petrol.svg" // Путь к изображению из папки public
              alt="Petrol"
              className={styles.filterIcon}
            />
            <span className={styles.filterLabel}>Petrol</span>
          </div>
          <div className={styles.filterSlot}>
            <img
              src="/images/Kitchen.svg" // Путь к изображению из папки public
              alt="Kitchen"
              className={styles.filterIcon}
            />
            <span className={styles.filterLabel}>Kitchen</span>
          </div>
          <div className={styles.filterSlot}>
            <img
              src="/images/AC.svg" // Путь к изображению из папки public
              alt="AC"
              className={styles.filterIcon}
            />
            <span className={styles.filterLabel}>AC</span>
          </div>
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
