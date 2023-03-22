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
} from '@mui/material';

//Date Picker Imports
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//Export csv
import { ExportToCsv } from 'export-to-csv';

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
    dateFrom: new Date(),
    dateTo: new Date(),
    minTransactionAmount: null,
    maxTransactionAmount: null,
    typeTransaction: 'ALL',
  });

  const [dataTable, setDataTable] = useState<Employee[]>([]);
  const [flagSearch, setFlagSearch] = useState<boolean>(false);

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
            }}>
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
            })}>
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
            })}>
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

  const csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.header),
  };

  const exportToCsv = new ExportToCsv(csvOptions);

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

  const onSearch = () => {
    setDataTable(data);
    setFlagSearch(true);
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
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                ml={1}
                mb={-1}>
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
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                ml={1}
                mb={-1}>
                Date from
              </Typography>
              <DatePickerDefault
                handleOnChange={onChangeDate.bind(
                  this,
                  setValues,
                  values,
                  'dateFrom'
                )}
                value={values.dateFrom}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                ml={1}
                mb={-1}>
                Date to
              </Typography>
              <DatePickerDefault
                handleOnChange={onChangeDate.bind(
                  this,
                  setValues,
                  values,
                  'dateTo'
                )}
                value={values.dateTo}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                ml={1}
                mb={-1}>
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
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                ml={1}
                mb={-1}>
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
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                ml={1}
                mb={-1}>
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
                  inputProps={{ 'aria-label': 'Without label' }}>
                  <MenuItem value={'ALL'}>All</MenuItem>
                  <MenuItem value={TYPE_TRANSACTION.INLAND}>Inland</MenuItem>
                  <MenuItem value={TYPE_TRANSACTION.INTERNATIONAL}>
                    International
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} mt={3} textAlign={'right'}>
              <Button
                data-testid="testId-btnClear"
                variant="contained"
                sx={{ width: '126px', height: '40px', ml: 2 }}
                className={classes.MbtnClear}
                color="warning"
                onClick={onClear}>
                Clear
              </Button>
              <Button
                data-testid="testId-btnSearch"
                variant="contained"
                color="primary"
                sx={{ width: '126px', height: '40px', ml: 2 }}
                className={classes.MbtnSearch}
                onClick={onSearch}>
                Search
              </Button>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        {flagSearch && (
          <MaterialReactTable
            columns={columns}
            data={dataTable}
            enableRowSelection
            positionToolbarAlertBanner="bottom"
            renderTopToolbarCustomActions={({ table }) => {
              const handleDeactivate = () => {
                exportToCsv.generateCsv(
                  table.getSelectedRowModel().flatRows.map((row) => {
                    return {
                      name: `${row.original.firstName} ${row.original.lastName}`,
                      email: row.original.email,
                      transactionAmount: row.original.transactionAmount,
                      commissionAmount: row.original.commissionAmount,
                      typeTransaction: row.original.typeTransaction,
                      transactionDate: row.original.transactonDate,
                    };
                  })
                );
              };

              return (
                <div
                  style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem' }}>
                  <Button
                    sx={{ textTransform: 'none' }}
                    color="success"
                    disabled={!table.getIsSomeRowsSelected()}
                    onClick={handleDeactivate}
                    variant="contained">
                    Export Data
                  </Button>
                </div>
              );
            }}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default StatisticDefault;
