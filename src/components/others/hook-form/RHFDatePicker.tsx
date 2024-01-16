// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { DEFAULT_DATE_FORMAT } from '~/constants';
import { FieldForm } from './types';

// ----------------------------------------------------------------------

export default function RHFDatePicker(props: FieldForm<DatePickerProps<Dayjs>>) {
  const { name, defaultValue = null, readOnly, slotProps, sx, required, ...other } = props;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...field}
          onChange={(value) => {
            field.onChange(value);
          }}
          value={field.value ? dayjs(field.value) : null}
          format={DEFAULT_DATE_FORMAT}
          slotProps={{
            ...slotProps,
            textField: {
              error: !!error,
              helperText: error?.message,
              fullWidth: true,
              required: required,
              ...slotProps?.textField,
            },
          }}
          readOnly={readOnly}
          sx={{
            ...(readOnly && { pointerEvents: 'none' }),
            ...sx,
          }}
          {...other}
        />
      )}
    />
  );
}
