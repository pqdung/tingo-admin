import React from 'react'
import { Backdrop, CircularProgress } from '@mui/material';
import { useTranslation } from "react-i18next";

export interface loadingModalProps {
  open: boolean;
}

export default function TLoading(props: loadingModalProps) {
  const { open } = props;
  const { t } = useTranslation('common');

  return (
    <div>
      <Backdrop sx={{ color: '#FFF', zIndex: (theme) => theme.zIndex.modal + 1 }} open={open}>
        <div style={{ marginRight: "15px" }}>{t('loadingMessage')}</div>
        <CircularProgress color="inherit"/>
      </Backdrop>
    </div>
  )
}
