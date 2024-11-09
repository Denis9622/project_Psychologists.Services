// src/api/campersApi.js
import axios from 'axios';

export const fetchCampers = async filters => {
  const response = await axios.get(
    'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers',
    {
      params: filters,
    }
  );
  return response.data;
};
