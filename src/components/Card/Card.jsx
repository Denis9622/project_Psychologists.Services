import { useNavigate } from 'react-router-dom';
import styles from './Card.module.css';
import Rating from '/public/images/Rating.svg';
import HeartIcon from '/public/images/Heart.svg';
import MapIcon from '/public/images/Map.svg';
import AcIcon from '/public/images/AC.svg';
import AutomaticIcon from '/public/images/Automatic.svg';
import KitchenIcon from '/public/images/Kitchen.svg';
import PetrolIcon from '/public/images/petrol.svg';

const Card = ({ camper }) => {
  const navigate = useNavigate();

  const { id, name, price, description, rating, location, gallery } = camper;
  const imageUrl =
    gallery && gallery.length > 0
      ? gallery[0].original
      : 'default-image-url.jpg';

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
              src={HeartIcon}
              alt="Heart icon"
              className={styles.heartIcon}
            />
          </div>
        </div>

        <div className={styles.ratingContainer}>
          <img src={Rating} alt="Rating stars" className={styles.ratingIcon} />
          <span className={styles.rating}>{rating} (2 Reviews)</span>
          <img src={MapIcon} alt="Map icon" className={styles.mapIcon} />
          <span className={styles.city}>{location}</span>
        </div>

        <p className={styles.description}>{description}</p>

        <div className={styles.filterSlots}>
          <div className={styles.filterSlot}>
            <img
              src={AutomaticIcon}
              alt="Automatic"
              className={styles.filterIcon}
            />
            <span className={styles.filterLabel}>Automatic</span>
          </div>
          <div className={styles.filterSlot}>
            <img src={PetrolIcon} alt="Petrol" className={styles.filterIcon} />
            <span className={styles.filterLabel}>Petrol</span>
          </div>
          <div className={styles.filterSlot}>
            <img
              src={KitchenIcon}
              alt="Kitchen"
              className={styles.filterIcon}
            />
            <span className={styles.filterLabel}>Kitchen</span>
          </div>
          <div className={styles.filterSlot}>
            <img src={AcIcon} alt="AC" className={styles.filterIcon} />
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
