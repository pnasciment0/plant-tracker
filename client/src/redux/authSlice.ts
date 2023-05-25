// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    errorMessage: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.errorMessage = null;
    },
    logout: (state) => {
      state.user = null;
    },
    authError: (state, action) => { // action to handle any error messages
      state.errorMessage = action.payload;
    },
  },
});

// Export the actions generated for this slice
export const { login, logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;