// @flow
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { writeJsonFile, writeJsonFileSync } from 'write-json-file';
import dayjs, { Dayjs } from 'dayjs';
import DatePickerValue from '../components/datePickker';

const fs = require('fs');

type Props = {};

interface ValueProps {
  currency: Number | null;
  time: null | string | Dayjs;
}

export default function CommissionManage(props: Props) {
  const [values, setValues] = React.useState<ValueProps>({
    currency: null,
    time: dayjs(new Date()),
  });

  const handleClickDate = (date: any) => {
    setValues({ ...values, time: date });
  };

  const handleClickAdd = () => {
    fs.writeFile(
      'data.json',
      { test: 'dfasdfasf' },
      'utf8',
      function (err: any) {
        if (err) {
          console.log('An error occured while writing JSON Object to File.');
          return console.log(err);
        }

        console.log('JSON file has been saved.');
      }
    );
  };
  return (
    <Grid container direction="row" alignItems="stretch" spacing={2}>
      <Grid item xs={12}>
        <h1>Commission Management</h1>
      </Grid>
      <Box border={'1px solid black'} width={800} height={600} ml={3} p={2}>
        <Grid container direction="row" alignItems="stretch" spacing={2}>
          <Grid item xs={6}>
            <Typography>Time</Typography>
            <DatePickerValue
              value={values.time}
              onClickDate={handleClickDate}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="standard">
              <Typography>Curency</Typography>
              <TextField
                id="input-currency"
                value={values.currency}
                type="number"
                onChange={(e) =>
                  setValues({ ...values, currency: Number(e.target.value) })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ textTransform: 'none' }}
              onClick={handleClickAdd}>
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}
