import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    list: [], // Список избранных кемперов
  },
  reducers: {
    addToFavorites: (state, action) => {
      const camper = action.payload;
      const isAlreadyFavorite = state.list.some(fav => fav.id === camper.id);
      if (!isAlreadyFavorite) {
        state.list.push(camper);
      }
    },
    removeFromFavorites: (state, action) => {
      const camperId = action.payload;
      // Оставляем только те кемперы, которые не совпадают по id
      state.list = state.list.filter(camper => camper.id !== camperId);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
