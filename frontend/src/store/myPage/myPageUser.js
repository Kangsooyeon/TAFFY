import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserProfile, fetchUserUpdateProfile } from '../../apis/user/user.js';

export const fetchUserProfileAsync = createAsyncThunk(
  'user/fetchUserProfile',
  async () => {
    const data = await fetchUserProfile();
    return data;
  }
);

export const fetchUserUpdateProfileAsync = createAsyncThunk(
  'user/fetchUserUpdateProfile',
  async (profileData) => {
    const data = await fetchUserUpdateProfile(profileData);
    console.log(profileData);
    return data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfileAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfileAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchUserProfileAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUserUpdateProfileAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserUpdateProfileAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchUserUpdateProfileAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
