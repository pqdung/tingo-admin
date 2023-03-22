import React, { useMemo, useState } from 'react';

//MRT Imports
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';

//Material-UI Imports
import {
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputAdornment,
  Input,
} from '@mui/material';

import { utils, writeFile, read } from 'xlsx';
import moment from 'moment';

//Mock Data
import { data } from '../../fakeData/dataStatistic';
import { useTranslation } from 'react-i18next';
import { useStyles } from '../../layouts/styles/makeTheme';
import { TYPE_TRANSACTION } from '../../utils/enum/comonEnum';
import { onChange, onChangeDate } from '../../utils/utils';
import MainCard from '../../components/mainCard';
import DatePickerDefault from '../../components/datePicker';

export type Employee = {
  firstName: string;
  lastName: string;
  email: string;
  typeTransaction: string;
  transactionAmount: number;
  transactonDate: string;
  signatureCatchPhrase: string;
  commissionAmount: number;
};

interface ValuesType {
  query: string;
  dateFrom: any;
  dateTo: any;
  minTransactionAmount: number | null;
  maxTransactionAmount: number | null;
  typeTransaction: string;
}

const StatisticDefault = () => {
  const classes = useStyles();
  const { t } = useTranslation(['dashboard']);
  const [values, setValues] = useState<ValuesType>({
    query: '',
    dateFrom: null,
    dateTo: null,
    minTransactionAmount: null,
    maxTransactionAmount: null,
    typeTransaction: 'ALL',
  });

  const [dataTable, setDataTable] = useState<Employee[]>(data);

  const columns = useMemo<MRT_ColumnDef<Employee>[]>(
    () => [
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`, //accessorFn used to join multiple data into a single cell
        id: 'name', //id is still required when using accessorFn instead of accessorKey
        header: 'Name',
        flex: 2.5,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },
      {
        accessorKey: 'email', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        enableClickToCopy: true,
        header: 'Email',
        flex: 3,
      },

      {
        accessorKey: 'transactionAmount',
        filterVariant: 'range',
        header: 'Transaction Amount',
        flex: 2,
        //custom conditional format and styling
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={(theme) => ({
              borderRadius: '0.25rem',
              color: theme.palette.warning.dark,
              maxWidth: '9ch',
              p: '0.25rem',
            })}
          >
            {cell.getValue<number>()?.toLocaleString?.('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Box>
        ),
      },
      {
        accessorKey: 'commissionAmount',
        filterVariant: 'range',
        header: 'Commission Amount',
        flex: 2,
        //custom conditional format and styling
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={(theme) => ({
              borderRadius: '0.25rem',
              color: theme.palette.success.dark,
              maxWidth: '9ch',
              p: '0.25rem',
            })}
          >
            {cell.getValue<number>()?.toLocaleString?.('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Box>
        ),
      },
      {
        accessorKey: 'typeTransaction', //hey a simple column for once
        header: 'Type Transaction',
        flex: 3.5,
      },
      {
        accessorFn: (row) => new Date(row.transactonDate), //convert to Date for sorting and filtering
        id: 'transactonDate',
        header: 'Transaction Date',
        filterFn: 'lessThanOrEqualTo',
        sortingFn: 'datetime',
        Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), //render Date as a string
        Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
      },
    ],
    []
  );

  const onClear = () => {
    setValues({
      query: '',
      dateFrom: new Date(),
      dateTo: new Date(),
      minTransactionAmount: null,
      maxTransactionAmount: null,
      typeTransaction: 'ALL',
    });
  };

  const onSearch = async () => {
    // if (
    //   !values.query &&
    //   !values.dateFrom &&
    //   !values.dateTo &&
    //   !values.maxTransactionAmount &&
    //   !values.minTransactionAmount &&
    //   values.typeTransaction === 'ALL'
    // ) {
    //   setDataTable(data);
    // } else {
    //   let dataQuery: Employee[] = [],
    //     dataDateFrom,
    //     dataDateTo,
    //     dataMin,
    //     dataType: Employee[] = [];
    //   if (!!values.query) {
    //     dataQuery = data.filter(
    //       (el: Employee) => `${el.firstName} ${el.lastName}`.includes(values.query) || el.email === values.query
    //     );
    //   }
    //   if (values.dateFrom) {
    //     let newData = data.filter((el: Employee) => moment(el.transactonDate).isAfter(moment(values.dateFrom)));
    //   }
    //   if (values.dateFrom) {
    //     let newData = data.filter((el: Employee) => moment(el.transactonDate).isBefore(moment(values.dateTo)));
    //   }
    //   if (!!values.minTransactionAmount) {
    //     let newData = data.filter((el: Employee) => el.transactionAmount >= Number(values.minTransactionAmount));
    //   }
    //   if (!!values.maxTransactionAmount) {
    //     let newData = data.filter((el: Employee) => el.transactionAmount <= Number(values.maxTransactionAmount));
    //   }
    //   if (values.typeTransaction === TYPE_TRANSACTION.INLAND) {
    //     dataType = data.filter((el: Employee) => el.typeTransaction === TYPE_TRANSACTION.INLAND);
    //   }
    //   if (values.typeTransaction === TYPE_TRANSACTION.INTERNATIONAL) {
    //     let newData = data.filter((el: Employee) => el.typeTransaction === TYPE_TRANSACTION.INTERNATIONAL);
    //   }
    //   const a: Employee[] = new Set<Employee>([...dataQuery, ...dataType])
    //   setDataTable(a);
    // }
  };

  const handleImportFile = (e: any) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;
      reader.onload = (e: any) => {
        /* Parse data */
        const bstr = e.target.result;
        const wb = read(bstr, { type: rABS ? 'binary' : 'array' });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = utils.sheet_to_json<Employee>(ws, {
          blankrows: false,
          raw: true,
          rawNumbers: true,
        });
        setDataTable(data);

        /* Update state */
      };
      if (rABS) reader.readAsBinaryString(files[0]);
      else reader.readAsArrayBuffer(files[0]);
    }
  };

  return (
    <Grid container rowSpacing={2} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Typography variant="h5">{t('statistic')}</Typography>
      </Grid>
      <Grid item xs={12}>
        <MainCard content={false} sx={{ p: 3 }}>
          <Grid container rowSpacing={4} columnSpacing={2.75}>
            <Grid item xs={4}>
              <Typography gutterBottom variant="subtitle1" component="div" ml={1} mb={-1}>
                Name or Email
              </Typography>
              <TextField
                id="query"
                name="query"
                className={classes.MTextField}
                value={values.query}
                sx={{ width: '80%' }}
                size={'small'}
                onChange={onChange.bind(this, setValues, values)}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography gutterBottom variant="subtitle1" component="div" ml={1} mb={-1}>
                Date from
              </Typography>
              <DatePickerDefault
                handleOnChange={onChangeDate.bind(this, setValues, values, 'dateFrom')}
                value={values.dateFrom}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography gutterBottom variant="subtitle1" component="div" ml={1} mb={-1}>
                Date to
              </Typography>
              <DatePickerDefault
                handleOnChange={onChangeDate.bind(this, setValues, values, 'dateTo')}
                value={values.dateTo}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography gutterBottom variant="subtitle1" component="div" ml={1} mb={-1}>
                Minimum transaction amount
              </Typography>
              <TextField
                id="minTransactionAmount"
                name="minTransactionAmount"
                type={'number'}
                className={classes.MTextField}
                value={values.minTransactionAmount}
                sx={{ width: '80%' }}
                size={'small'}
                onChange={onChange.bind(this, setValues, values)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography gutterBottom variant="subtitle1" component="div" ml={1} mb={-1}>
                Maximum transaction amount
              </Typography>
              <TextField
                id="maxTransactionAmount"
                name="maxTransactionAmount"
                type={'number'}
                className={classes.MTextField}
                value={values.maxTransactionAmount}
                sx={{ width: '80%' }}
                size={'small'}
                onChange={onChange.bind(this, setValues, values)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography gutterBottom variant="subtitle1" component="div" ml={1} mb={-1}>
                Type of transaction
              </Typography>
              <FormControl fullWidth className={classes.Mselect}>
                <Select
                  id="typeTransaction"
                  name="typeTransaction"
                  sx={{ width: '80%', mt: 1.5, ml: 1 }}
                  size={'small'}
                  value={values.typeTransaction}
                  onChange={onChange.bind(this, setValues, values)}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value={'ALL'}>All</MenuItem>
                  <MenuItem value={TYPE_TRANSACTION.INLAND}>Inland</MenuItem>
                  <MenuItem value={TYPE_TRANSACTION.INTERNATIONAL}>International</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} mt={3} textAlign={'right'}>
              <Input
                id="import-ap-button-file"
                data-testid="testId-btnImport"
                type="file"
                onChange={handleImportFile}
                style={{ display: 'none' }}
              />

              <label htmlFor="import-ap-button-file">
                <Button
                  id="import-file"
                  variant="contained"
                  color="success"
                  className={classes.MbtnSearch}
                  sx={{ width: 126 }}
                  component="span"
                >
                  Import
                </Button>
              </label>
              <Button
                data-testid="testId-btnClear"
                variant="contained"
                sx={{ width: '126px', height: '40px', ml: 2 }}
                className={classes.MbtnClear}
                color="warning"
                onClick={onClear}
              >
                Clear
              </Button>
              <Button
                data-testid="testId-btnSearch"
                variant="contained"
                color="primary"
                sx={{ width: '126px', height: '40px', ml: 2 }}
                className={classes.MbtnSearch}
                onClick={onSearch}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <MaterialReactTable
          columns={columns}
          data={dataTable}
          enableRowSelection
          positionToolbarAlertBanner="bottom"
          renderTopToolbarCustomActions={({ table }) => {
            const handleDeactivate = () => {
              let dataExport = table.getSelectedRowModel().flatRows.map((row) => {
                return {
                  firstName: row.original.lastName,
                  lastName: row.original.lastName,
                  email: row.original.email,
                  transactionAmount: row.original.transactionAmount,
                  commissionAmount: row.original.commissionAmount,
                  typeTransaction: row.original.typeTransaction,
                  transactionDate: row.original.transactonDate,
                };
              });
              const ws = utils.json_to_sheet(dataExport);
              const wb = utils.book_new();
              utils.book_append_sheet(wb, ws, 'SheetJS');
              /* generate XLSX file and send to client */
              writeFile(wb, 'Example.xlsx');
            };

            return (
              <div style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem' }}>
                <Button
                  sx={{ textTransform: 'none' }}
                  color="success"
                  disabled={!table.getIsSomeRowsSelected()}
                  onClick={handleDeactivate}
                  variant="contained"
                >
                  Export Data
                </Button>
              </div>
            );
          }}
        />
      </Grid>
    </Grid>
  );
};

export default StatisticDefault;
