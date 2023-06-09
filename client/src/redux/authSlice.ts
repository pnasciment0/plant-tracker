import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk, createAction} from '@reduxjs/toolkit';
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
        console.log('fetchMe has error', response.error);
        return rejectWithValue(response.error);
      } else {
        return response.data;
      }
    } catch (error: any) {
      console.log('fetchMe caught an exception', error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { username: string, password: string }, thunkAPI) => {
    try {
      const response = await ApiFunctions.userLogin(credentials.username, credentials.password);
      if ('error' in response) {
        console.log("ERROR");
        console.log(response);
        return thunkAPI.rejectWithValue(response.error);
      } else {
        console.log(response);
        thunkAPI.dispatch(fetchMe()); 
        console.log("JUST FIRED GETME NOW RETURNING");
        return response; // Return login data
      }
    } catch (error: any) {
      console.log("CATCH EXCEPTION");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      const response = await ApiFunctions.userLogout();
      if ('error' in response) {
        console.log("ERROR");
        console.log(response);
        return thunkAPI.rejectWithValue(response.error);
      } else {
        console.log(response);
        thunkAPI.dispatch(resetUserData()); 
        console.log("JUST LOGGED OUT NOW RETURNING");
        return response; // Return logout data
      }
    } catch (error: any) {
      console.log("CATCH EXCEPTION");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const resetUserData = createAction('auth/resetUserData');

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
      .addCase(resetUserData, (state) => {
        // Reset state to initial state on user logout
        return initialState;
      })
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
        console.log("FETCH ME REJECTED");
        state.loading = 'idle';
        if (typeof action.payload === 'string') {
          state.errorMessage = action.payload;
        } else if (action.error.message) {
          state.errorMessage = action.error.message;
        }
        console.log("CASE OVER, PRINTING STATE");
        console.log(state);
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = 'idle';
        // if (action.payload !== undefined) {
        //   state.user = action.payload?.data?.user || null;
        //   state.token = action.payload?.data?.token || null;
        // }
        console.log("LOGIN USER FULFILLED PRINTING STATE");
        console.log(state);
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