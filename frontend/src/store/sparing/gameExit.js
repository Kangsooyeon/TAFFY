import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGameExit } from '../../apis/spar/gameExit.js';

export const fetchGameExitAsync = createAsyncThunk(
  'sparingExit/fetchGameExit',
  async ({sessionId, roomType}) => {
    const data = await fetchGameExit(sessionId, roomType);
    // console.log('Fetched data:', data);
    return data;
  }
);

const sparingExitSlice = createSlice({
  name: 'sparingExit',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGameExitAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGameExitAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload
      })
      .addCase(fetchGameExitAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default sparingExitSlice.reducer;
