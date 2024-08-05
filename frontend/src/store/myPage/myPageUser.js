// store/myPage/myPageUser.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserProfile, fetchUserUpdateProfile } from '../../apis/user/user.js';
import { fetchNicknameProfile } from '../../apis/user/nickname.js';

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
    return data;
  }
);

export const fetchNicknameProfileAsync = createAsyncThunk(
  'user/fetchNicknameProfile',
  async ({ nickName }) => {
    const data = await fetchNicknameProfile({ nickName });
    return data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    status: 'idle',
    error: null,
    nicknameStatus: 'idle',
    nicknameError: null,
    nicknameValid: null,
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
      })
      .addCase(fetchNicknameProfileAsync.pending, (state) => {
        state.nicknameStatus = 'loading';
      })
      .addCase(fetchNicknameProfileAsync.fulfilled, (state, action) => {
        state.nicknameStatus = 'succeeded';
        state.nicknameValid = action.payload;  // true 또는 false 값
      })
      .addCase(fetchNicknameProfileAsync.rejected, (state, action) => {
        state.nicknameStatus = 'failed';
        state.nicknameError = action.error.message;
      });
  },
});

export default userSlice.reducer;
