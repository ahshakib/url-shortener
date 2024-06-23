import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const shortenUrl = createAsyncThunk('url/shortenUrl', async (originalUrl) => {
  const response = await axios.post('https://url-shortener-fj69.onrender.com/api/shorten', { originalUrl });
  return response.data;
});

const urlSlice = createSlice({
  name: 'url',
  initialState: { urls: [], status: null },
  extraReducers: (builder) => {
    builder
      .addCase(shortenUrl.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(shortenUrl.fulfilled, (state, { payload }) => {
        state.urls.push(payload);
        state.status = 'success';
      })
      .addCase(shortenUrl.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default urlSlice.reducer;
