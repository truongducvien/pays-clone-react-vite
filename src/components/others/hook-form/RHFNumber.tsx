// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';
import { forwardRef } from 'react';
import { FieldForm } from './types';

import { NumericFormat, NumericFormatProps } from 'react-number-format';

// ----------------------------------------------------------------------

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = forwardRef<NumericFormatProps, CustomProps>(function NumericFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      allowLeadingZeros={false}
      decimalScale={0}
      {...other}
    />
  );
});

export default function RHFNumber(props: FieldForm<TextFieldProps & { numericProps?: NumericFormatProps }>) {
  const { name, defaultValue = '', readOnly, inputProps, sx, InputProps, numericProps, ...other } = props;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <TextField
          fullWidth
          error={!!error?.message}
          helperText={error?.message}
          inputProps={{
            readOnly,
            ...inputProps,
          }}
          sx={{
            ...(readOnly && { pointerEvents: 'none' }),
            ...sx,
          }}
          InputProps={{
            inputComponent: NumericFormatCustom as any,
            inputProps: numericProps as any,
            ...InputProps,
          }}
          {...field}
          {...other}
        />
      )}
    />
  );
}
