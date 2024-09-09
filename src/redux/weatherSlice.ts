import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface City {
  name: string;
  country: string;
  timezone: string;
}

interface WeatherState {
  cities: City[];
  weather: any;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: WeatherState = {
  cities: [],
  weather: null,
  status: 'idle',
};

export const fetchCities = createAsyncThunk('weather/fetchCities', async () => {
  const response = await axios.get(
    'https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=&rows=10'
  );
  return response.data.records;
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default weatherSlice.reducer;
