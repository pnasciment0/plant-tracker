import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiFunctions from '../api/apiHelper';
import { User, Message, APIResponse, LoginResponse } from '../types/types';

interface State {
  user: User | null;
  errorMessage: string | null;
  token: string | null;
  loading: 'idle' | 'loading';
}

const initialState: State = {
  user: null,
  errorMessage: null,
  token: null,
  loading: 'idle'
};

export const fetchMe = createAsyncThunk(
  'auth/fetchMe',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFunctions.getMe();
      if (response.error) {
        return rejectWithValue(response.error);
      } else {
        return response.data; // Return user data
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async (credentials: { username: string, password: string }, { rejectWithValue }) => {
//     try {
//       const response = await ApiFunctions.userLogin(credentials.username, credentials.password);
//       if (response.error) {
//         return rejectWithValue(response.error);
//       } else {
//         return response.data; // Return user data
//       }
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { username: string, password: string }, { rejectWithValue }) => {
    try {
      const response = await ApiFunctions.userLogin(credentials.username, credentials.password);
      if ('error' in response) {
        return rejectWithValue(response.error);
      } else {
        return response; // Return login data
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
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
        if (typeof action.payload === 'string') {
          state.errorMessage = action.payload;
        } else if (action.error.message) {
          state.errorMessage = action.error.message;
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = 'idle';
        if (action.payload !== undefined) {
          state.user = action.payload?.data?.user || null;
          state.token = action.payload?.data?.token || null;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = 'idle';
        state.errorMessage = action.error.message || 'An error occurred';
      });
  },
});

// Export the actions generated for this slice
export const { logout, authError } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;