import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LoadingState = {
  state: boolean;
};

const initialState: LoadingState = {
  state: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    openLoading: (state: LoadingState, action: PayloadAction<boolean>) => {
      state.state = action.payload;
    },
  },
});

export const { openLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
