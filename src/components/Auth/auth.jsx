import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile, 
} from 'firebase/auth';
import { auth } from '../../services/firebase';

export const register = async (email, password, name) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  if (name) {
    await updateProfile(user, { displayName: name });
  }

  return user;
};

export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

export const logout = async () => {
  await signOut(auth);
};

export const getCurrentUser = callback => {
  return onAuthStateChanged(auth, user => {
    if (user) {
      callback({ ...user, displayName: user.displayName });
    } else {
      callback(null); 
    }
  });
};
