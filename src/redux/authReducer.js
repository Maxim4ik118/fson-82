import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const instance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com/',
});

export const token = {
  set: token => {
    instance.defaults.headers['Authorization'] = token;
  },
  clear: () => {
    instance.defaults.headers['Authorization'] = '';
  },
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post(`users/signup`, formData);
      token.set(data.token);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post(`users/login`, formData);
      token.set(data.token);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logOutUser = createAsyncThunk(
  'auth/logOutUser',
  async thunkApi => {
    try {
      await instance.post(`users/logout`);
      token.clear();

      return;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const userToken = state.auth.token;

      token.set(userToken);
      const { data } = await instance.get(`users/current`);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      const token = state.auth.token;

      if (!token) return false;
    },
  }
);

const initialState = {
  userData: null,
  token: null,
  isLoading: false,
  authenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder =>
    builder
      // --------------- REGISTER -----------------
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authenticated = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })
      // --------------- LOGIN -----------------
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authenticated = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })
      // --------------- LOG OUT -----------------
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authenticated = false;
        state.userData = null;
        state.token = null;
      })
      // --------------- REFRESH USER -----------------
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authenticated = true;
        state.userData = action.payload;
      })
      
      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      ,
});

// Селектори

export const selectUserAuthentication = state => state.auth.authenticated;
export const selectUserData = state => state.auth.userData;
export const selectUserIsLoading = state => state.auth.isLoading;
export const selectUserError = state => state.auth.error;
export const selectUserToken = state => state.auth.token;

// Редюсер слайсу
export const authReducer = authSlice.reducer;
