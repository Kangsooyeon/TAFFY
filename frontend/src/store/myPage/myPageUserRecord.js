import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserRecord, fetchUserRecordUpdate } from '../../apis/record/userRecord.js';

export const fetchUserRecordAsync = createAsyncThunk(
  'userRecord/fetchUserRecord',
  async () => {
    const data = await fetchUserRecord();
    return data;
  }
);

export const fetchUserRecordUpdateAsync = createAsyncThunk(
  'userRecord/fetchUserRecordUpdate',
  async (winorlose) => {
    const data = await fetchUserRecordUpdate(winorlose);
    console.log('Fetched data:', data);
    return data;
  }
);

const userRecordSlice = createSlice({
  name: 'userRecord',
  initialState: {
    record: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchUserRecordAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchUserRecordAsync.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.record = action.payload;
    })
    .addCase(fetchUserRecordAsync.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
    .addCase(fetchUserRecordUpdateAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchUserRecordUpdateAsync.fulfilled, (state, action) => {
      state.status = 'succeeded';
      // 업데이트된 기록을 기존 기록에 반영
      state.record = action.payload;
    })
    .addCase(fetchUserRecordUpdateAsync.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default userRecordSlice.reducer;
