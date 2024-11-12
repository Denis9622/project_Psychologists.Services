import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCampers = createAsyncThunk(
  'vehicles/fetchCampers',
  async (filters, { rejectWithValue }) => {
    const formattedFilters = {
      'filter[AC]': filters.ac || undefined,
      'filter[TV]': filters.tv || undefined,
      page: 1,
    };

    Object.keys(formattedFilters).forEach(key => {
      if (formattedFilters[key] === undefined) {
        delete formattedFilters[key];
      }
    });

    try {
      const response = await axios.get(
        'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers',
        { params: formattedFilters }
      );
      const data = response.data;
      return Array.isArray(data) ? data : data.items || [];
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState: {
    list: [],
    favorites: [],
    camperDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCampers.pending, state => {
        state.loading = true;
        state.error = null;
        state.list = []; // Очистка списка перед загрузкой
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка при загрузке данных';
      });
  },
});

export default vehiclesSlice.reducer;
