import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './../Firebase/firebase';

export const subscribeToAuthChanges = callback => {
  console.log('Subscribing to auth state changes...');
  const unsubscribe = onAuthStateChanged(auth, user => {
    console.log('Auth state changed:', user);
    callback(user);
  });
  return unsubscribe; // Возвращаем функцию отписки
};
