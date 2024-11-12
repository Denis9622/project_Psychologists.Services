import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './CamperDetailPage.module.css';
import { fetchCamperDetails } from '../../redux/vehiclesSlice';
import Loader from '../../components/Loader/Loader';
import Header from '../../components/Header/Header';


function CamperDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    camperDetails: camper,
    loading,
    error,
  } = useSelector(state => state.vehicles);
  const [activeTab, setActiveTab] = useState('features');

  useEffect(() => {
    dispatch(fetchCamperDetails(id));
  }, [dispatch, id]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!camper) return <div>Camper not found</div>;


  

  const {
    name,
    price = 0,
    description = '',
    rating = 0,
    location = '',
    gallery = [],
  } = camper;

  // Содержимое вкладки "Features"
  const renderFeatures = () => (
    <div>
      <h3 className={styles.subheading}>Vehicle Features</h3>
      <ul className={styles.featuresList}>
        {camper.automatic && <li>Automatic</li>}
        {camper.ac && <li>AC</li>}
        {camper.petrol && <li>Petrol</li>}
        {camper.kitchen && <li>Kitchen</li>}
        {camper.radio && <li>Radio</li>}
      </ul>

      <h3 className={styles.subheading}>Vehicle Details</h3>
      <ul className={styles.detailsList}>
        <li>Form: {camper.form || 'Unknown'}</li>
        <li>Length: {camper.length ? `${camper.length} cm` : 'N/A'}</li>
        <li>Width: {camper.width ? `${camper.width} cm` : 'N/A'}</li>
        <li>Height: {camper.height ? `${camper.height} cm` : 'N/A'}</li>
        <li>Tank: {camper.tank ? `${camper.tank} L` : 'N/A'}</li>
        <li>
          Consumption:{' '}
          {camper.consumption ? `${camper.consumption} L/100km` : 'N/A'}
        </li>
      </ul>
    </div>
  );

  // Содержимое вкладки "Reviews"
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
      <Header /> {/* Добавили Header здесь */}
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
              gallery.slice(0, 4).map((image, index) => (
                <img
                  key={index}
                  src={image.original} // Путь к изображениям также должен быть с учетом папки public
                  alt={`Camper Image ${index + 1}`}
                  className={styles.image}
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>

          <p className={styles.description}>
            {description || 'No description available'}
          </p>

          {/* Переключаемые вкладки */}
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

          {/* Содержимое активной вкладки */}
          <div className={styles.tabContent}>
            {activeTab === 'features' ? renderFeatures() : renderReviews()}
          </div>
          <form className={styles.bookingForm}>
            <h2 className={styles.bookingTitle}>Book your campervan now</h2>
            <p className={styles.bookingText}>
              Stay connected! We are always ready to help you.
            </p>

            <label htmlFor="name">Name*</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">Email*</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="bookingDate">Booking date*</label>
            <input type="date" id="bookingDate" name="bookingDate" required />

            <label htmlFor="comment">Comment</label>
            <textarea id="comment" name="comment"></textarea>

            <button type="submit" className={styles.submitButton}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CamperDetailPage;
