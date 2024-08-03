import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {fetchUserRecord} from '../../apis/record/userRecord.js'

export const fetchUserRecordAsync = createAsyncThunk(
  'user/fetchUserRecord',
  async () => {
    const data = await fetchUserRecord();
    return data;
  }
)

const userRecordSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
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
        state.profile = action.payload;
      })
      .addCase(fetchUserRecordAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
})

export default userRecordSlice.reducer