export interface MessageBox {
  open: boolean;
  title?: string;
  message: string;
  showYesBtn?: boolean;
  showNoBtn?: boolean;
  showCloseBtn?: boolean;
  onConfirm?: any;
  onClose?: any;
  color?: any;
}



