// store/myPage/myPageUser.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSparingUser } from '../../apis/spar/sparUser.js';

export const fetchSparingUserAsync = createAsyncThunk(
  'sparingUser/fetchSparingUser',
  async () => {
    const data = await fetchSparingUser();
    return data;
  }
);

const sparingUserSlice = createSlice({
  name: 'sparingUser',
  initialState: {
    userdata: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSparingUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSparingUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userdata = action.payload;
      })
      .addCase(fetchSparingUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export default sparingUserSlice.reducer;
