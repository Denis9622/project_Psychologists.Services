import { createSlice } from '@reduxjs/toolkit';

// Функция для загрузки избранных кемперов из localStorage
const loadFavorites = () => {
  const savedFavorites = localStorage.getItem('favorites');
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

// Функция для сохранения избранных кемперов в localStorage
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
      const camper = action.payload;
      const isAlreadyFavorite = state.list.some(fav => fav.id === camper.id);
      if (!isAlreadyFavorite) {
        state.list.push(camper);
        saveFavorites(state.list); // Сохраняем обновленный список в localStorage
      }
    },
    removeFromFavorites: (state, action) => {
      const camperId = action.payload;
      state.list = state.list.filter(camper => camper.id !== camperId);
      saveFavorites(state.list); // Сохраняем обновленный список в localStorage
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
