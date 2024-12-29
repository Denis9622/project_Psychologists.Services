// src/utilits/firebaseAuth.js

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './../Firebase/firebase'; // Подключение конфигурации Firebase

/**
 * Подписка на изменения состояния аутентификации.
 * @param {function} callback - Коллбек для обработки изменения пользователя.
 * @returns {function} Функция для отмены подписки.
 */
export const subscribeToAuthChanges = callback => {
  console.log('Subscribing to auth changes...');
  return onAuthStateChanged(auth, user => {
    console.log('Auth state changed: ', user); // Лог состояния аутентификации
    callback(user);
  });
};
