import { FormControl, FormHelperText, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { UploadAvatar, UploadProps } from '../upload';
import { FieldForm } from './types';

export function RHFUploadAvatar({
  name,
  label,
  required,
  disabled,
  readOnly,
  ...other
}: FieldForm<Omit<UploadProps, 'file'>>) {
  const { control, setValue } = useFormContext();

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const newFile = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });

    setValue(name, newFile, { shouldDirty: true, shouldValidate: true });
  };

  return (
    <Controller
      name={name}
      control={control}
      disabled={disabled}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormControl fullWidth>
            {label && (
              <Typography component={'div'} fontWeight={500} mb={1.5} variant='body2'>
                {label}
                {required && '*'}
              </Typography>
            )}
            <UploadAvatar
              error={!!error}
              disabled={disabled}
              readOnly={readOnly}
              file={field.value}
              onDrop={handleDrop}
              {...other}
            />

            {error?.message && (
              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {error.message}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
}
