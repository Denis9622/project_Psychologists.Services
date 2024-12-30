import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBP9QhM_amUbPYEYQ7qLOgY322beDwybqc',
  authDomain: 'psychologistsapp.firebaseapp.com',
  databaseURL: 'https://psychologistsapp-default-rtdb.firebaseio.com',
  projectId: 'psychologistsapp',
  storageBucket: 'psychologistsapp.firebasestorage.app',
  messagingSenderId: '1026108303745',
  appId: '1:1026108303745:web:7bb3b0c0751fb6f4bce080',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase(app);

export { db, ref, get, auth };
