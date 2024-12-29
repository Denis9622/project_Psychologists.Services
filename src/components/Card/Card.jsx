import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/favoritesSlice';
import { useState } from 'react';
import { auth } from '../../components/Firebase/firebase'; // Для проверки авторизации
import Modal from '../Card/Modal'; // Компонент для модального окна
import styles from './Card.module.css'; // Подключаем стили

function Card({ psychologist }) {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.list);
  const isFavorite = favorites.some(fav => fav.id === psychologist.id);
  const [showModal, setShowModal] = useState(false); // Состояние для модального окна

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
              Price/hour: ${psychologist.price_per_hour}
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
        <button className={styles.readMore}>Read More</button>
      </div>

      {/* Модальное окно */}
      {showModal && (
        <Modal onClose={closeModal}>
          <h2>Вы не авторизованы</h2>
          <p>Чтобы добавить в избранное, пожалуйста, войдите в свой аккаунт.</p>
          <button onClick={closeModal} className={styles.modalCloseButton}>
            Закрыть
          </button>
        </Modal>
      )}
    </div>
  );
}

export default Card;
