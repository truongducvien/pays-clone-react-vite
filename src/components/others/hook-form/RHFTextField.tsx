// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';
import { FieldForm } from './types';

// ----------------------------------------------------------------------

export default function RHFTextField(props: FieldForm<TextFieldProps>) {
  const { name, defaultValue = '', readOnly, inputProps, ...other } = props;
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
          {...field}
          {...other}
        />
      )}
    />
  );
}
