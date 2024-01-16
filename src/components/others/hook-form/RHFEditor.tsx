// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { FormControl, FormHelperText, Typography } from '@mui/material';
//
import Editor, { EditorProps } from '../editor';
import { FieldForm } from './types';

// ----------------------------------------------------------------------

export default function RHFEditor({ name, label, required, ...other }: FieldForm<EditorProps>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth>
          {label && (
            <Typography component={'div'} fontWeight={500} mb={1.5} variant='body2'>
              {label}
              {required && '*'}
            </Typography>
          )}
          <Editor id={name} value={field.value} onChange={field.onChange} error={!!error} {...other} />
          {error?.message && <FormHelperText error>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
