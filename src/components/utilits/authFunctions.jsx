import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../services/firebase';

export const subscribeToAuthChanges = callback => {
  const unsubscribe = onAuthStateChanged(auth, user => {
    callback(user);
  });
  return unsubscribe; // Возвращаем функцию отписки
};
