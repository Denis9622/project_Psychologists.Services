import { createSlice } from '@reduxjs/toolkit';

// Функция для загрузки избранных психологов из localStorage
const loadFavorites = () => {
  const savedFavorites = localStorage.getItem('favorites');
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

// Функция для сохранения избранных психологов в localStorage
const saveFavorites = favorites => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    list: loadFavorites(), // Инициализируем из localStorage
  },
  reducers: {
    addToFavorites: (state, action) => {
      const psychologist = action.payload;
      const isAlreadyFavorite = state.list.some(
        fav => fav.id === psychologist.id
      );
      if (!isAlreadyFavorite) {
        state.list.push(psychologist);
        saveFavorites(state.list); // Сохраняем обновленный список в localStorage
      }
    },
    removeFromFavorites: (state, action) => {
      const psychologistId = action.payload;
      state.list = state.list.filter(
        psychologist => psychologist.id !== psychologistId
      );
      saveFavorites(state.list); // Сохраняем обновленный список в localStorage
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
