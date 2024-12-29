import { createSlice } from '@reduxjs/toolkit';
import { db, ref, get } from '../components/Firebase/firebase.jsx'; // Импортируем Firebase

// Асинхронный экшн для загрузки психологов
export const fetchPsychologistsAsync = () => async dispatch => {
  dispatch(setLoading(true)); // Начинаем загрузку

  try {
    const dbRef = ref(db); // Получаем данные с корня базы
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const psychologistsData = snapshot.val();
      const psychologistsArray = Object.keys(psychologistsData).map(key => ({
        id: key, // Используем ключи как id
        ...psychologistsData[key], // Данные психолога
      }));
      dispatch(setPsychologists(psychologistsArray)); // Сохраняем данные в store
    } else {
      dispatch(setError('Нет данных'));
    }
  } catch (error) {
    dispatch(setError(error.message)); // Если ошибка, сохраняем её
  } finally {
    dispatch(setLoading(false)); // Завершаем загрузку
  }
};

const psychologistsSlice = createSlice({
  name: 'psychologists',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    setPsychologists(state, action) {
      state.list = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setPsychologists, setLoading, setError } =
  psychologistsSlice.actions;
export default psychologistsSlice.reducer;
