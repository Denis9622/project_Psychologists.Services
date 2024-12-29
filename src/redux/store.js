import { configureStore } from '@reduxjs/toolkit';
import vehiclesReducer from './vehiclesSlice';
import filtersReducer from './filtersSlice';
import favoritesReducer from './favoritesSlice'; // Импортируем favoritesReducer
import psychologistsReducer from './psychologistsSlice'; // Импортируем psychologistsReducer

export const store = configureStore({
  reducer: {
    vehicles: vehiclesReducer,
    filters: filtersReducer,
    favorites: favoritesReducer, // Добавляем favoritesReducer
    psychologists: psychologistsReducer, // Добавляем psychologistsReducer
  },
});
