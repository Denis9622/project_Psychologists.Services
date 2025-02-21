import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/favorites/favoritesSlice';
import { auth } from '../../services/firebase'; 
import Modal from '../Modal/Modal'; 
import AppointmentForm from '../AppointmentForm/AppointmentForm'; 
import styles from './Card.module.css';

function Card({ psychologist }) {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.list);
  const isFavorite = favorites.some(fav => fav.id === psychologist.id);
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  const toggleFavorite = () => {
    const user = auth.currentUser;
    if (!user) {
      setShowModal(true);
      return;
    }

    if (isFavorite) {
      dispatch(removeFromFavorites(psychologist.id));
    } else {
      dispatch(addToFavorites(psychologist));
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleDetails = () => {
    setShowDetails(prevState => !prevState);
  };

  const handleMakeAppointment = () => {
    setShowAppointmentModal(true);
  };

  const closeAppointmentModal = () => {
    setShowAppointmentModal(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={psychologist.avatar_url}
          alt={psychologist.name}
          className={styles.avatar}
        />
        <span className={styles.onlineIndicator}></span>
      </div>
      <div className={styles.details}>
        <div className={styles.headerRow}>
          <div className={styles.titleAndName}>
            <h3 className={styles.title}>Psychologist</h3>
          </div>
          <div className={styles.rating}>
            ⭐ Rating: {psychologist.rating}
            <p className={styles.price}>
              Price/hour:{' '}
              <span className={styles.pricegreen}>
                ${psychologist.price_per_hour}
              </span>
            </p>
            <button
              className={`${styles.favoriteButton} ${
                isFavorite ? styles.favoriteActive : ''
              }`}
              onClick={toggleFavorite}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
        <div>
          <h2 className={styles.name}>{psychologist.name}</h2>
        </div>
        <div className={styles.flexWrap}>
          <p>
            <span className={styles.spanp}>Experience:</span>{' '}
            {psychologist.experience}
          </p>
          <p>
            <span className={styles.spanp}>License:</span>{' '}
            {psychologist.license}
          </p>
          <p>
            <span className={styles.spanp}>Specialization:</span>{' '}
            {psychologist.specialization}
          </p>
          <p>
            <span className={styles.spanp}>Initial Consultation:</span>{' '}
            {psychologist.initial_consultation}
          </p>
        </div>
        <p className={styles.about}>{psychologist.about}</p>
        <button className={styles.readMore} onClick={toggleDetails}>
          {showDetails ? 'Show Less' : 'Read More'}
        </button>

        {showDetails && (
          <div className={styles.additionalDetails}>
            {psychologist.reviews.map((review, index) => (
              <div key={index} className={styles.review}>
                <div className={styles.reviewAvatar}>
                  {review.reviewer.charAt(0)}
                </div>
                <div className={styles.reviewContent}>
                  <p className={styles.reviewer}>
                    <strong>{review.reviewer}</strong>
                  </p>
                  <p> ⭐ {review.rating}</p>
                  <p className={styles.comment}>{review.comment}</p>
                </div>
              </div>
            ))}
            <button
              className={styles.makeAppointmentButton}
              onClick={handleMakeAppointment}
            >
              Make an appointment
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <Modal onClose={closeModal} className={styles.modalContainer}>
          <h2>You are not logged in</h2>
          <p>To add to favorites, please log in to your account.</p>
          <button onClick={closeModal} className={styles.modalCloseButton}>
            Close
          </button>
        </Modal>
      )}

      {showAppointmentModal && (
        <Modal onClose={closeAppointmentModal}>
          <AppointmentForm
            psychologist={psychologist}
            onClose={closeAppointmentModal}
          />
        </Modal>
      )}
    </div>
  );
}

export default Card;
