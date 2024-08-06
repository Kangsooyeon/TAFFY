// store/myPage/myPageUser.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchQuickSparing } from '../../apis/spar/quickStart.js';

export const fetchQuickSparingAsync = createAsyncThunk(
  'quickStart/fetchQuickSparing',
  async () => {
    const data = await fetchQuickSparing();
    return data;
  }
);

const quickStartSlice = createSlice({
  name: 'quickStart',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuickSparingAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuickSparingAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchQuickSparingAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export default quickStartSlice.reducer;
