import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged, // Добавляем импорт onAuthStateChanged
} from 'firebase/auth';
import { auth } from './../Firebase/firebase';

// Регистрация пользователя
export const register = async (email, password) => {
  try {
    console.log('Attempting to register user with email:', email); // Логирование email
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log('User registered successfully:', userCredential.user); // Логирование успешной регистрации
    return userCredential.user;
  } catch (error) {
    console.error('Error registering new user:', error); // Логирование ошибки
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    throw error; // Бросаем ошибку, чтобы ее можно было обработать в компоненте
  }
};

// Вход пользователя
export const login = async (email, password) => {
  try {
    console.log('Attempting to log in user with email:', email); // Логирование email
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log('User logged in successfully:', userCredential.user); // Логирование успешного входа
    return userCredential.user;
  } catch (error) {
    console.error('Error logging in:', error); // Логирование ошибки
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    throw error; // Бросаем ошибку, чтобы ее можно было обработать в компоненте
  }
};

// Выход пользователя
export const logout = async () => {
  try {
    console.log('Attempting to log out user...'); // Логирование начала выхода
    await signOut(auth);
    console.log('User logged out successfully.'); // Логирование успешного выхода
  } catch (error) {
    console.error('Error logging out:', error); // Логирование ошибки
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    throw error; // Бросаем ошибку, чтобы ее можно было обработать в компоненте
  }
};

// Функция для подписки на изменения аутентификации
export const getCurrentUser = callback => {
  console.log('Subscribing to auth state changes...');
  onAuthStateChanged(auth, user => {
    console.log('Auth state changed:', user); // Логирование изменений аутентификации
    callback(user);
  });
};
