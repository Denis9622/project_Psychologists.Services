import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from '../filters/filtersSlice';
import favoritesReducer from '../favorites/favoritesSlice'; 
import psychologistsReducer from '../psychologists/psychologistsSlice'; 

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    favorites: favoritesReducer, 
    psychologists: psychologistsReducer, 
  },
});
