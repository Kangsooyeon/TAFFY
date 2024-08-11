import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGameExit } from '../../apis/spar/gameExit.js';

export const fetchGameExitAsync = createAsyncThunk(
  'sparingExit/fetchGameExit',
  async ({roomType, sessionId}) => {
    const data = await fetchGameExit(roomType, sessionId);
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
      .addCase(fetchSparingMissionUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSparingMissionUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = {
          ...state.data,
          [action.meta.arg]: action.payload
        };
      })
      .addCase(fetchSparingMissionUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default sparingExitSlice.reducer;
