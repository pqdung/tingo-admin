import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageBox } from "../../models/messageBox";
import { stringNullOrEmpty } from "../../utils/utils";

type State = {
  messageBox: MessageBox
};

const initialState: State = {
  messageBox: {
    open: false,
    title: 'TINGO',
    message: '',
    showYesBtn: false,
    showNoBtn: false,
    showCloseBtn: true,
    onConfirm: null,
    onClose: null,
    color: '#1A2038'
  }
};

const handleActionShow = (state: State, payload: MessageBox) => {
  state.messageBox.open = true;
  state.messageBox.title = stringNullOrEmpty(payload.title) ? state.messageBox.title: payload.title;
  state.messageBox.message = stringNullOrEmpty(payload.message) ? state.messageBox.message: payload.message;
  state.messageBox.color = payload.color;
  return state;
}

export const messageBoxSlice = createSlice({
  name: 'messageBox',
  initialState,
  reducers: {
    showMessageBox: (state: State, action: PayloadAction<any>) => {
      action.payload.color = '#1A2038';
      handleActionShow(state, action.payload);
    },
    showWarningBox: (state: State, action: PayloadAction<any>) => {
      action.payload.color = (theme: any) => theme.palette.warning.main;
      handleActionShow(state, action.payload);
    },
    showErrorBox: (state: State, action: PayloadAction<any>) => {
      action.payload.color = (theme: any) => theme.palette.error.main;
      handleActionShow(state, action.payload);
    },
    closeMessageBox: (state: State, action: PayloadAction<boolean>) => {
      state.messageBox.open = action.payload;
    },
  },
});

export const { showMessageBox, showWarningBox, showErrorBox, closeMessageBox } = messageBoxSlice.actions;

export default messageBoxSlice.reducer;
