// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiFunctions from '../api/apiHelper';
import { User } from '../types/types';

interface State {
  user: User | null;
  errorMessage: string | null;
  loading: 'idle' | 'loading';
}

const initialState: State = {
  user: null,
  errorMessage: null,
  loading: 'idle'
};

export const fetchMe = createAsyncThunk(
  'auth/fetchMe',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFunctions.getMe();
      // Ensure that the response is not empty
      if (!response) {
        return rejectWithValue('No user data returned');
      }
      console.log("user data is:");
      console.log(response.data);
      return response.data; // Return user data
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = 'idle';
        if (action.payload !== undefined) { // 
          state.user = action.payload;
        }
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.loading = 'idle';
        action.error.message || 'An error occurred';
      });
  },
});

// Export the actions generated for this slice
export const { login, logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;