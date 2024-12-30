import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/favoritesSlice';
import { auth } from '../../components/Firebase/firebase'; // Для проверки авторизации
import Modal from '../Card/Modal'; // Компонент для модального окна
import AppointmentForm from '../../components/Card/AppointmentForm'; // Компонент для формы заявки
import styles from './Card.module.css'; // Подключаем стили

function Card({ psychologist }) {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.list);
  const isFavorite = favorites.some(fav => fav.id === psychologist.id);
  const [showModal, setShowModal] = useState(false); // Состояние для модального окна
  const [showDetails, setShowDetails] = useState(false); // Состояние для показа дополнительных деталей
  const [showAppointmentModal, setShowAppointmentModal] = useState(false); // Состояние для показа модального окна заявки

  const toggleFavorite = () => {
    const user = auth.currentUser; // Проверка авторизации
    if (!user) {
      setShowModal(true); // Показ модального окна для неавторизованных пользователей
      return;
    }

    if (isFavorite) {
      dispatch(removeFromFavorites(psychologist.id));
    } else {
      dispatch(addToFavorites(psychologist));
    }
  };

  const closeModal = () => {
    setShowModal(false); // Закрытие модального окна
  };

  const toggleDetails = () => {
    setShowDetails(prevState => !prevState); // Переключение состояния показа деталей
  };

  const handleMakeAppointment = () => {
    setShowAppointmentModal(true); // Показ модального окна для заявки на встречу
  };

  const closeAppointmentModal = () => {
    setShowAppointmentModal(false); // Закрытие модального окна для заявки на встречу
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

        {/* Показ дополнительных деталей при клике на кнопку Read More */}
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

      {/* Модальное окно */}
      {showModal && (
        <Modal onClose={closeModal}>
          <h2>You are not logged in</h2>
          <p>To add to favorites, please log in to your account.</p>
          <button onClick={closeModal} className={styles.modalCloseButton}>
            Close
          </button>
        </Modal>
      )}

      {/* Модальное окно для заявки на встречу */}
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
