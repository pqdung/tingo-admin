import React from 'react'
import { Backdrop, CircularProgress } from '@mui/material';
import { useAppSelector } from "../../store/store";

export default function TLoading() {
  const loadingState = useAppSelector((state) => state.loading.state);

  return (
    <div>
      <Backdrop sx={{ color: '#FFF', zIndex: (theme) => theme.zIndex.modal + 1 }} open={loadingState}>
        <div style={{ marginRight: "15px" }}/>
        <CircularProgress color="inherit"/>
      </Backdrop>
    </div>
  )
}
