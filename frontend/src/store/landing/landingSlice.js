import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeItem: 0,
};

const landingSlice = createSlice({
  name: 'landing',
  initialState,
  reducers: {
    setActiveItem: (state, action) => {
      state.activeItem = action.payload;
    },
  },
});

export const { setActiveItem } = landingSlice.actions;
export default landingSlice.reducer;
