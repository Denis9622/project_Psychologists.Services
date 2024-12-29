import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';

// Конфигурация Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyD_Si3_XQe2oWHzfFHPcTHiH2oKaAUrK0M',
  authDomain: 'apppp-aac4f.firebaseapp.com',
  databaseURL:
    'https://apppp-aac4f-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'apppp-aac4f',
  storageBucket: 'apppp-aac4f.firebasestorage.app',
  messagingSenderId: '48696766039',
  appId: '1:48696766039:web:23440fbd871fa236137d12',
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Инициализация службы аутентификации
const db = getDatabase(app);

export { db, ref, get, auth };
