import { configureStore } from '@reduxjs/toolkit';
import vehiclesReducer from '../vehicles/vehiclesSlice';
import filtersReducer from '../filters/filtersSlice';
import favoritesReducer from '../favorites/favoritesSlice'; 
import psychologistsReducer from '../psychologists/psychologistsSlice'; 

export const store = configureStore({
  reducer: {
    vehicles: vehiclesReducer,
    filters: filtersReducer,
    favorites: favoritesReducer, 
    psychologists: psychologistsReducer, 
  },
});
