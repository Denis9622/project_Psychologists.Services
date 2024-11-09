import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCampers = createAsyncThunk(
  'vehicles/fetchCampers',
  async filters => {
    const response = await axios.get(
      'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers',
      {
        params: filters,
      }
    );
    return response.data;
  }
);

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState: {
    list: [],
    favorites: [],
    loading: false,
  },
  reducers: {
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCampers.pending, state => {
        state.loading = true;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.list = Array.isArray(action.payload.items)
          ? action.payload.items
          : [];
        state.loading = false;
      })
      .addCase(fetchCampers.rejected, state => {
        state.loading = false;
      });
  },
});

export const { addToFavorites } = vehiclesSlice.actions;
export default vehiclesSlice.reducer;
