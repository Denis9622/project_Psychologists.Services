import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Функция для получения кемперов с фильтрами
export const fetchCampers = createAsyncThunk(
  'vehicles/fetchCampers',
  async (filters, { rejectWithValue }) => {
    // Проверяем, что features и vehicleType определены и являются массивами
    const features = Array.isArray(filters.features) ? filters.features : [];
    const vehicleType = Array.isArray(filters.vehicleType)
      ? filters.vehicleType
      : [];

    // Форматируем параметры запроса для передачи в виде строки
    const formattedFilters = {
      'filter[location]': filters.location || '', // Фильтр по городу
      'filter[AC]': features.includes('ac') ? true : undefined, // Фильтр по функции AC
      'filter[automatic]': features.includes('automatic') ? true : undefined, // Фильтр по функции automatic
      'filter[kitchen]': features.includes('kitchen') ? true : undefined, // Фильтр по функции kitchen
      'filter[tv]': features.includes('tv') ? true : undefined, // Фильтр по функции tv
      'filter[bathroom]': features.includes('bathroom') ? true : undefined, // Фильтр по функции bathroom
      'filter[vehicleType]': vehicleType.length > 0 ? vehicleType[0] : '', // Фильтр по типу
      page: filters.page || 1, // Пагинация
    };

    // Удаляем неактивные фильтры (undefined или пустые)
    Object.keys(formattedFilters).forEach(key => {
      if (formattedFilters[key] === undefined || formattedFilters[key] === '') {
        delete formattedFilters[key];
      }
    });

    console.log('Formatted request params:', formattedFilters);

    try {
      const response = await axios.get(
        'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers',
        { params: formattedFilters }
      );
      console.log('fetchCampers response:', response.data);

      // Проверяем данные от сервера
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (
        response.data &&
        typeof response.data === 'object' &&
        response.data.items
      ) {
        return response.data.items;
      } else {
        throw new Error('Формат данных с сервера не соответствует ожидаемому');
      }
    } catch (error) {
      console.error(
        'Ошибка запроса fetchCampers:',
        error.response?.data || error.message
      );
      return rejectWithValue(error.response?.data || 'Ошибка сети');
    }
  }
);

// Остальной код без изменений...

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
