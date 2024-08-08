import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSparingMissionUser } from '../../apis/spar/sparMission.js';

export const fetchSparingMissionUserAsync = createAsyncThunk(
  'sparingMission/fetchSparingMissionUser',
  async (type) => {
    const data = await fetchSparingMissionUser(type);
    console.log('Fetched data:', data);
    return data;
  }
);

const sparingMissionSlice = createSlice({
  name: 'sparingMission',
  initialState: {
    data: {
      ATK: null,
      DEF: null
    },
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

export default sparingMissionSlice.reducer;
