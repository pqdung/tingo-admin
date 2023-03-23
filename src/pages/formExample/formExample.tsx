import React, { useEffect, useMemo, useState } from 'react';

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
import { PREFIX_LOCALE, TYPE_TRANSACTION } from '../../utils/enum/comonEnum';
import { onChange, onChangeDate, stringNullOrEmpty } from '../../utils/utils';
import MainCard from '../../components/common/mainCard';
import DatePickerDefault from '../../components/common/datePicker';
import i18n from "i18next";
import InputNumberFormat from '../../components/common/inputNumberFormat';

import { MRT_Localization_EN } from 'material-react-table/locales/en';
import { MRT_Localization_ZH_HANS } from 'material-react-table/locales/zh-Hans';

export type Employee = {
  firstName: string;
  lastName: string;
  email: string;
  typeTransaction: string;
  transactionAmount: number;
  transactionDate: string;
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

const FormExample = () => {
  const classes = useStyles();
  const { t } = useTranslation(['formExample']);
  const [values, setValues] = useState<ValuesType>({
    query: '',
    dateFrom: null,
    dateTo: null,
    minTransactionAmount: null,
    maxTransactionAmount: null,
    typeTransaction: 'ALL',
  });
  const [currentLocale, setCurrentLocale] = useState(MRT_Localization_EN);

  useEffect(()=>{
    if(!stringNullOrEmpty(i18n.language)) {
      switch (i18n.language) {
        case PREFIX_LOCALE.EN:
          setCurrentLocale(MRT_Localization_EN);
          break;
        case PREFIX_LOCALE.ZH:
          setCurrentLocale(MRT_Localization_ZH_HANS);
          break;
        default:
          break;
      }
    }
  },[i18n.language]);

  const [dataTable, setDataTable] = useState<Employee[]>(data);

  const columns = useMemo<MRT_ColumnDef<Employee>[]>(
    () => [
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        id: 'name',
        header: t('name'),
        flex: 2.5,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}>
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },
      {
        accessorKey: 'email',
        enableClickToCopy: true,
        header: t('email'),
        flex: 3,
      },

      {
        accessorKey: 'transactionAmount',
        filterVariant: 'range',
        header: t('transactionAmount'),
        flex: 2,
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
        header: t('commissionAmount'),
        flex: 2,
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
        accessorKey: 'typeTransaction',
        header: t('typeTransaction'),
        flex: 3.5,
      },
      {
        accessorFn: (row) => new Date(row.transactionDate),
        id: 'transactionDate',
        header: t('transactionDate'),
        filterFn: 'lessThanOrEqualTo',
        sortingFn: 'datetime',
        Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(),
        Header: ({ column }) => <em>{column.columnDef.header}</em>,
      },
    ],
    [i18n.language]
  );

  const onClear = () => {
    setValues({
      query: '',
      dateFrom: null,
      dateTo: null,
      minTransactionAmount: null,
      maxTransactionAmount: null,
      typeTransaction: 'ALL',
    });
  };

  const onSearch = async () => {
    let dataQuery = !!values.query
      ? data.filter(
          (el: Employee) =>
            `${el.firstName} ${el.lastName}`.includes(values.query) ||
            el.email === values.query
        )
      : data;
    let dataDateFrom = !!values.dateFrom
      ? dataQuery.filter((el: Employee) =>
          moment(el.transactionDate).isAfter(moment(values.dateFrom))
        )
      : dataQuery;

    let dataDateTo = !!values.dateTo
      ? dataDateFrom.filter((el: Employee) =>
          moment(el.transactionDate).isBefore(moment(values.dateTo))
        )
      : dataDateFrom;

    let datamMinTransactionAmount = !!values.minTransactionAmount
      ? dataDateTo.filter(
          (el: Employee) =>
            el.transactionAmount >= Number(values.minTransactionAmount)
        )
      : dataDateTo;

    let dataMaxTransactionAmount = !!values.maxTransactionAmount
      ? datamMinTransactionAmount.filter(
          (el: Employee) =>
            el.transactionAmount <= Number(values.maxTransactionAmount)
        )
      : datamMinTransactionAmount;

    let dataType =
      values.typeTransaction === TYPE_TRANSACTION.DOMESTIC
        ? dataMaxTransactionAmount.filter(
            (el: Employee) => el.typeTransaction === TYPE_TRANSACTION.DOMESTIC
          )
        : values.typeTransaction === TYPE_TRANSACTION.INTERNATIONAL
        ? dataMaxTransactionAmount.filter(
            (el: Employee) =>
              el.typeTransaction === TYPE_TRANSACTION.INTERNATIONAL
          )
        : dataMaxTransactionAmount;

    setDataTable(dataType);
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
        <Typography variant="h5">{t('exampleForm')}</Typography>
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
                {t('nameOrEmail')}
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
                {t('dateFrom')}
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
                {t('dateTo')}
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
              <InputNumberFormat
                handleChange={(e: any) => {
                  setValues({
                    ...values,
                    minTransactionAmount: Number(e.target.value),
                  });
                }}
                title={t('minimumTransactionAmount')}
                value={values.minTransactionAmount}
              />
            </Grid>
            <Grid item xs={4}>
              <InputNumberFormat
                handleChange={(e: any) => {
                  setValues({
                    ...values,
                    maxTransactionAmount: Number(e.target.value),
                  });
                }}
                title={t('maximumTransactionAmount')}
                value={values.maxTransactionAmount}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                ml={1}
                mb={-1}>
                {t('typeOfTransaction')}
              </Typography>
              <FormControl fullWidth className={classes.MSelect}>
                <Select
                  id="typeTransaction"
                  name="typeTransaction"
                  sx={{ width: '80%', mt: 1.5, ml: 1 }}
                  size={'small'}
                  value={values.typeTransaction}
                  onChange={onChange.bind(this, setValues, values)}
                  inputProps={{ 'aria-label': 'Without label' }}>
                  <MenuItem value={'ALL'}>{t('all')}</MenuItem>
                  <MenuItem value={TYPE_TRANSACTION.DOMESTIC}>
                    {t('domestic')}
                  </MenuItem>
                  <MenuItem value={TYPE_TRANSACTION.INTERNATIONAL}>
                    {t('international')}
                  </MenuItem>
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
                  component="span">
                  {t('import')}
                </Button>
              </label>
              <Button
                data-testid="testId-btnClear"
                variant="contained"
                sx={{ width: '126px', height: '40px', ml: 2 }}
                className={classes.MbtnClear}
                color="warning"
                onClick={onClear}>
                {t('clear')}
              </Button>
              <Button
                data-testid="testId-btnSearch"
                variant="contained"
                color="primary"
                sx={{ width: '126px', height: '40px', ml: 2 }}
                className={classes.MbtnSearch}
                onClick={onSearch}>
                {t('search')}
              </Button>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <MaterialReactTable
          localization={currentLocale}
          columns={columns}
          data={dataTable}
          enableRowSelection
          positionToolbarAlertBanner="bottom"
          renderTopToolbarCustomActions={({ table }) => {
            const handleDeactivate = () => {
              let dataExport = table
                .getSelectedRowModel()
                .flatRows.map((row) => {
                  return {
                    firstName: row.original.lastName,
                    lastName: row.original.lastName,
                    email: row.original.email,
                    transactionAmount: row.original.transactionAmount,
                    commissionAmount: row.original.commissionAmount,
                    typeTransaction: row.original.typeTransaction,
                    transactionDate: row.original.transactionDate,
                  };
                });
              const ws = utils.json_to_sheet(dataExport);
              const wb = utils.book_new();
              utils.book_append_sheet(wb, ws, 'SheetJS');
              /* generate XLSX file and send to client */
              writeFile(wb, 'Example.xlsx');
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
                  {t('exportData')}
                </Button>
              </div>
            );
          }}
        />
      </Grid>
    </Grid>
  );
};

export default FormExample;
