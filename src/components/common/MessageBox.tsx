import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Grid,
  Typography
} from '@mui/material';
import { useAppDispatch, useAppSelector } from "../../store/store";
import IconButton from "@mui/material/IconButton";
import { Close } from "@mui/icons-material";
import { closeMessageBox } from "../../store/slices/messageBoxSlice";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
  color: string;
}

function CustomDialogTitle(props: DialogTitleProps) {
  const { children, onClose, color, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, backgroundColor: color, color: '#fff' }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: '#fff'
          }}
        >
          <Close/>
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function MessageBox() {
  const dispatch = useAppDispatch();
  const messageBox = useAppSelector((state) => state.messageBox.messageBox);

  const onHandleClose = () => {
    dispatch(closeMessageBox(false));
    if (messageBox.onClose) messageBox.onClose();
  }

  return (
    <Dialog
      open={messageBox.open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      PaperProps={{ sx: { minWidth: 500, minHeight: 300 } }}
    >
      <CustomDialogTitle id="customized-dialog-title" onClose={onHandleClose} color={messageBox.color}>
        {messageBox.title}
      </CustomDialogTitle>
      <DialogContent dividers sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <DialogContentText id="alert-dialog-description">
          <Typography align="center" sx={{ wordBreak: 'break-word' }}>
            {messageBox.message}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'flex-end', m: 1 }}>
        <Button
          variant={'contained'}
          sx={{
            display: messageBox.showYesBtn ? undefined : 'none',
            color: messageBox.color,
            borderColor: messageBox.color,
            "&:hover": {
              borderColor: messageBox.color
            }
          }}
        >
          {'Yes'}
        </Button>
        <Button
          variant={'outlined'}
          sx={{
            display: messageBox.showNoBtn ? undefined : 'none',
            color: messageBox.color,
            borderColor: messageBox.color,
            "&:hover": {
              borderColor: messageBox.color
            }
          }}
        >
          {'No'}
        </Button>
        <Button
          variant={'outlined'}
          sx={{
            display: messageBox.showCloseBtn ? undefined : 'none',
            color: messageBox.color,
            borderColor: messageBox.color,
            "&:hover": {
              borderColor: messageBox.color
            }
          }}
          onClick={onHandleClose}
        >
          {'Close'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
