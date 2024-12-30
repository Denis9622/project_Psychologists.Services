// src/redux/favoritesSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Загрузка избранных товаров из localStorage
const loadFavorites = () => {
  const savedFavorites = localStorage.getItem('favorites');
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

// Сохранение избранных товаров в localStorage
const saveFavorites = favorites => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    list: loadFavorites(), // Загружаем список избранных
  },
  reducers: {
    addToFavorites: (state, action) => {
      const psychologist = action.payload;
      const isAlreadyFavorite = state.list.some(
        fav => fav.id === psychologist.id
      );
      if (!isAlreadyFavorite) {
        state.list.push(psychologist);
        saveFavorites(state.list); // Обновляем localStorage
        console.log('Psychologist added to favorites: ', psychologist);
      }
    },
    removeFromFavorites: (state, action) => {
      const psychologistId = action.payload;
      state.list = state.list.filter(
        psychologist => psychologist.id !== psychologistId
      );
      saveFavorites(state.list); // Обновляем localStorage
      console.log('Psychologist removed from favorites: ', psychologistId);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
