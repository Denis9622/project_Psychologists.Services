import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile, // Ensure updateProfile is imported
} from 'firebase/auth';
import { auth } from '../../services/firebase';

// Регистрация пользователя с установкой имени
export const register = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Устанавливаем имя пользователя
    if (name) {
      await updateProfile(user, { displayName: name });
      console.log('User profile updated with name:', name); // Log the successful update
    }

    return user;
  } catch (error) {
    console.error('Error registering new user:', error);
    throw error;
  }
};

// Вход пользователя
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Выход пользователя
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

// Подписка на изменения в аутентификации
export const getCurrentUser = callback => {
  return onAuthStateChanged(auth, user => {
    if (user) {
      // Возвращаем объект с полем displayName, если оно установлено
      callback({ ...user, displayName: user.displayName });
    } else {
      callback(null); // Если пользователь не авторизован
    }
  });
};
