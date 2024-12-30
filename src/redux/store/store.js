import { configureStore } from '@reduxjs/toolkit';
import vehiclesReducer from '../vehicles/vehiclesSlice';
import filtersReducer from '../filters/filtersSlice';
import favoritesReducer from '../favorites/favoritesSlice'; // Импортируем favoritesReducer
import psychologistsReducer from '../psychologists/psychologistsSlice'; // Импортируем psychologistsReducer

export const store = configureStore({
  reducer: {
    vehicles: vehiclesReducer,
    filters: filtersReducer,
    favorites: favoritesReducer, // Добавляем favoritesReducer
    psychologists: psychologistsReducer, // Добавляем psychologistsReducer
  },
});
