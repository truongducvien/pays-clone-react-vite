// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { FormControl, FormHelperText, Typography } from '@mui/material';
//
import { DropEvent, FileRejection } from 'react-dropzone';
import { Upload, UploadProps } from '../upload';
import { FieldForm } from './types';

export function RHFUpload({
  name,
  label,
  required,
  disabled,
  multiple,
  readOnly,
  maxFiles,
  onDrop,
  onRemove,
  onRemoveAll,
  ...other
}: FieldForm<Omit<UploadProps, 'file' | 'files'>>) {
  const { control, setValue, watch } = useFormContext();
  const value = watch(name);

  const handleDrop = (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
    // handle multiple later
    if (!multiple) {
      const file = acceptedFiles[0];
      if (!file) return;

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      setValue(name, newFile, { shouldDirty: true, shouldValidate: true });
    } else {
      const newFiles: File[] = [];
      if (maxFiles) {
        acceptedFiles.splice(maxFiles - value.length);
      }
      acceptedFiles.forEach((file) => {
        const newFile = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
        newFiles.push(newFile);
      });
      setValue(name, [...value, ...newFiles], { shouldDirty: true, shouldValidate: true });
    }
    onDrop?.(acceptedFiles, fileRejections, event);
  };

  const handleRemove = (file: string | File) => {
    setValue(
      name,
      value.filter((it: File) => it !== file)
    );
    onRemove?.(file);
  };

  const handleRemoveAll = () => {
    setValue(name, []);
    onRemoveAll?.();
  };

  return (
    <Controller
      name={name}
      control={control}
      disabled={disabled}
      defaultValue={multiple ? [] : undefined}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormControl fullWidth>
            {label && (
              <Typography component={'div'} fontWeight={500} mb={1.5} variant='body2'>
                {label}
                {required && '*'}
              </Typography>
            )}
            <Upload
              multiple={multiple}
              maxFiles={maxFiles}
              file={field.value}
              files={field.value}
              error={!!error}
              disabled={disabled}
              readOnly={readOnly}
              onDrop={handleDrop}
              onRemove={multiple ? handleRemove : undefined}
              onRemoveAll={multiple ? handleRemoveAll : undefined}
              {...other}
            />
            {error?.message && <FormHelperText error>{error.message}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
}
