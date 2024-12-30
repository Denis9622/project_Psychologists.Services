import { ref, get } from 'firebase/database';
import { db } from '../services/firebase';

export const fetchPsychologists = async () => {
  try {
    const psychologistsRef = ref(db, 'psychologists');
    const snapshot = await get(psychologistsRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const psychologists = Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      }));
      return psychologists;
    }
    return [];
  } catch (error) {
    throw new Error('Error loading psychologists');
  }
};
