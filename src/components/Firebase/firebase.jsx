import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';

// Конфигурация Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBP9QhM_amUbPYEYQ7qLOgY322beDwybqc',
  authDomain: 'psychologistsapp.firebaseapp.com',
  databaseURL: 'https://psychologistsapp-default-rtdb.firebaseio.com',
  projectId: 'psychologistsapp',
  storageBucket: 'psychologistsapp.firebasestorage.app',
  messagingSenderId: '1026108303745',
  appId: '1:1026108303745:web:7bb3b0c0751fb6f4bce080',
};

// Инициализация Firebase
console.log('Initializing Firebase...');
const app = initializeApp(firebaseConfig);
console.log('Firebase app initialized: ', app);

// Инициализация Auth и Database
const auth = getAuth(app);
console.log('Firebase Auth initialized: ', auth);
const db = getDatabase(app);
console.log('Firebase Database initialized: ', db);

export { db, ref, get, auth };
