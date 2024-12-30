import { ref, get } from 'firebase/database';
import { db } from '../services/firebase'; // Убедитесь, что путь к файлу правильный

export const fetchPsychologists = async () => {
  try {
    console.log('Initializing database reference...');
    const psychologistsRef = ref(db, 'psychologists');

    console.log('Fetching data from Firebase...');
    const snapshot = await get(psychologistsRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const psychologists = Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      }));

      console.log('Fetched data from Firebase:', psychologists);
      return psychologists;
    }

    console.log('No data found in Firebase');
    return [];
  } catch (error) {
    console.error('Error fetching psychologists:', error.message, error);
    throw new Error('Error loading psychologists');
  }
};
