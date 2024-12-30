import { createSlice } from '@reduxjs/toolkit';
import { db, ref, get } from '../../services/firebase'; 
export const fetchPsychologistsAsync = () => async dispatch => {
  dispatch(setLoading(true)); 

  try {
    const dbRef = ref(db); 
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const psychologistsData = snapshot.val();
      const psychologistsArray = Object.keys(psychologistsData).map(key => ({
        id: key, 
        ...psychologistsData[key], 
      }));
      dispatch(setPsychologists(psychologistsArray)); 
    } else {
      dispatch(setError('Нет данных'));
    }
  } catch (error) {
    dispatch(setError(error.message)); 
  } finally {
    dispatch(setLoading(false)); 
  }
};

const psychologistsSlice = createSlice({
  name: 'psychologists',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    setPsychologists(state, action) {
      state.list = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setPsychologists, setLoading, setError } =
  psychologistsSlice.actions;
export default psychologistsSlice.reducer;
