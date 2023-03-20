import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
interface Props {
  value: null | String | Dayjs;
  onClickDate: (item: any) => void;
}

export default function DatePickerValue({ value, onClickDate }: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          value={value}
          onChange={(newValue) => onClickDate(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
