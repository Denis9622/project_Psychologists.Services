import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Асинхронный thunk для загрузки всех кемперов
export const fetchCampers = createAsyncThunk(
  'vehicles/fetchCampers',
  async filters => {
    const response = await axios.get(
      'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers',
      {
        params: filters,
      }
    );
    console.log('fetchCampers response:', response.data);
    return response.data.items; // Возвращаем массив items напрямую
  }
);

// Асинхронный thunk для загрузки деталей конкретного кемпера
export const fetchCamperDetails = createAsyncThunk(
  'vehicles/fetchCamperDetails',
  async camperId => {
    const response = await axios.get(
      `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${camperId}`
    );
    return response.data;
  }
);

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState: {
    list: [], // Список кемперов
    favorites: [],
    camperDetails: null, // Данные конкретного кемпера
    loading: false,
    error: null,
  },
  reducers: {
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      // Обработка fetchCampers
      .addCase(fetchCampers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        console.log('fetchCampers.fulfilled:', action.payload);
        state.list = action.payload; // Записываем массив items в list
        state.loading = false;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Обработка fetchCamperDetails для загрузки деталей кемпера
      .addCase(fetchCamperDetails.pending, state => {
        state.loading = true;
        state.error = null;
        state.camperDetails = null; // Очищаем предыдущее значение
      })
      .addCase(fetchCamperDetails.fulfilled, (state, action) => {
        state.camperDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchCamperDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addToFavorites } = vehiclesSlice.actions;
export default vehiclesSlice.reducer;
