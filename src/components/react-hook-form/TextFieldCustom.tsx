import { TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { FieldForm } from './types';

export default function TextFieldCustom({
  name,
  label = '',
  defaultValue = '',
  ...others
}: FieldForm<TextFieldProps>) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <TextField
          label={label}
          error={!!error}
          helperText={error?.message}
          {...field}
          margin={'normal'}
          fullWidth
          {...others}
        />
      )}
    />
  );
}
