import * as React from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import { useStyles } from '../../layouts/styles/makeTheme';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values: any) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        prefix="$"
      />
    );
  }
);

interface Props {
  handleChange: (e: any) => void;
  value: number | null;
  title: string;
}

export default function InputNumberFormat({
  handleChange,
  value,
  title,
}: Props) {
  const classes = useStyles();

  return (
    <Box>
      <Typography
        gutterBottom
        variant="subtitle1"
        component="div"
        ml={1}
        mb={-1}>
        {title}
      </Typography>
      <TextField
        value={value ? value : ''}
        onChange={handleChange}
        name="numberformat"
        id="formatted-numberformat-input"
        sx={{ width: '80%' }}
        size={'small'}
        className={classes.MTextField}
        InputProps={{
          inputComponent: NumericFormatCustom as any,
        }}
      />
    </Box>
  );
}
