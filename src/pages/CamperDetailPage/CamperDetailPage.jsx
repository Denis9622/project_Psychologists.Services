import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './CamperDetailPage.module.css';
import { fetchCamperDetails } from '../../redux/vehiclesSlice';
// import Loader from '../../components/Loader/Loader';
import Header from '../../components/Header/Header';

function CamperDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    camperDetails: camper,
    // loading,
    error,
  } = useSelector(state => state.vehicles);
  const [activeTab, setActiveTab] = useState('features');

  useEffect(() => {
    dispatch(fetchCamperDetails(id));
  }, [dispatch, id]);

  // if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!camper) return <div>Camper not found</div>;

  const {
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

  const renderFeatures = () => (
    <div className={styles.vehiclecontainer}>
      {/* Filter Slots */}
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
            <img src="/images/AC.svg" alt="AC" className={styles.filterIcon} />
            <span className={styles.filterLabel}>AC</span>
          </div>
        )}
      </div>
      <h3 className={styles.subheading}>Vehicle Details</h3>
      <ul className={styles.detailsList}>
        <li>
          <span>Form:</span>
          <span>{camper.form || 'Unknown'}</span>
        </li>
        <li>
          <span>Length:</span>
          <span>{camper.length ? `${camper.length} cm` : 'N/A'}</span>
        </li>
        <li>
          <span>Width:</span>
          <span>{camper.width ? `${camper.width} cm` : 'N/A'}</span>
        </li>
        <li>
          <span>Height:</span>
          <span>{camper.height ? `${camper.height} cm` : 'N/A'}</span>
        </li>
        <li>
          <span>Tank:</span>
          <span>{camper.tank ? `${camper.tank} L` : 'N/A'}</span>
        </li>
        <li>
          <span>Consumption:</span>
          <span>
            {camper.consumption ? `${camper.consumption} L/100km` : 'N/A'}
          </span>
        </li>
      </ul>
    </div>
  );

  const renderReviews = () => (
    <div className={styles.reviews}>
      {Array.isArray(camper.reviews) ? (
        camper.reviews.map((review, index) => (
          <div key={index} className={styles.review}>
            <p>
              <strong>{review.reviewer_name}</strong>
            </p>
            <p>Rating: {review.reviewer_rating}</p>
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  );

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h3 className={styles.name}>{name}</h3>
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
          <div>
            <p className={styles.price}>{price.toFixed(2)} EUR</p>
          </div>
          <div className={styles.images}>
            {gallery.length > 0 ? (
              gallery
                .slice(0, 2)
                .map((image, index) => (
                  <img
                    key={index}
                    src={image.original}
                    alt={`Camper Image ${index + 1}`}
                    className={`${styles.image} ${
                      index === gallery.slice(0, 4).length - 1
                        ? styles.lastImage
                        : ''
                    }`}
                  />
                ))
            ) : (
              <p>No images available</p>
            )}
          </div>
          <p className={styles.description}>
            {description || 'No description available'}
          </p>
          <div className={styles.tabs}>
            <button
              className={`${styles.tabButton} ${
                activeTab === 'features' ? styles.activeTab : ''
              }`}
              onClick={() => setActiveTab('features')}
            >
              Features
            </button>
            <button
              className={`${styles.tabButton} ${
                activeTab === 'reviews' ? styles.activeTab : ''
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>
          <div className={styles.tabContent}>
            {activeTab === 'features' ? renderFeatures() : renderReviews()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CamperDetailPage;
