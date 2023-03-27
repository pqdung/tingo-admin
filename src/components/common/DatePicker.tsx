import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useStyles } from '../../layouts/styles/makeTheme';

interface DatePickerProps {
  handleOnChange: (value: any) => void;
  value: any;
  sx?: object;
  [otherProps: string]: any;
  helperText?: string;
}

export default function DatePickerDefault(props: DatePickerProps) {
  const classes = useStyles();
  const { handleOnChange, value, sx, helperText, ...otherProps } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        onChange={(newValue: any) => handleOnChange(newValue)}
        renderInput={(params: any) => (
          <TextField
            {...params}
            sx={{ ...sx, width: '80%' }}
            className={classes.MTextField}
            size={'small'}
            helperText={helperText ? helperText : ''}
          />
        )}
        value={value}
        {...otherProps}
      />
    </LocalizationProvider>
  );
}
