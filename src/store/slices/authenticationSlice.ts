import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginForm } from '../../models/userInterface';
import { authentication } from "../../adapters/authen-adapter";

type AuthState = {
  token: string | null;
  isLogin: boolean;
  refreshToken: string | null;
  sessionState: string | null;
  error: string | null;
  isShowSelect: boolean;
};

const initialState: AuthState = {
  token: '',
  isLogin: false,
  refreshToken: '',
  sessionState: '',
  error: '',
  isShowSelect: false,
};

export const onLogin = createAsyncThunk('login', async (payload: loginForm) => {
  try {
    return await authentication(payload);
  } catch (error) {
    throw error;
  }
});

const authenticationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogin = false;
      state.token = '';
      state.refreshToken = '';
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(onLogin.pending, (state) => {
      state.isLogin = false;
      state.token = '';
      state.refreshToken = '';
      state.error = '';
    });
    builder.addCase(onLogin.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLogin = true;
    });
    builder.addCase(onLogin.rejected, (state, action) => {
      state.error = action.error.message || '';
      state.token = '123';
      state.refreshToken = '123';
      state.sessionState = '123';
      state.isLogin = false;
    });
  },
});

export const { logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
