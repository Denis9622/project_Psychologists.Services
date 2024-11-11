// redux/favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addToFavorites: (state, action) => {
      const camper = action.payload;
      const isAlreadyFavorite = state.some(fav => fav.id === camper.id);
      if (!isAlreadyFavorite) {
        state.push(camper);
      }
    },
    removeFromFavorites: (state, action) => {
      const camperId = action.payload;
      return state.filter(camper => camper.id !== camperId);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
