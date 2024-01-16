// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { Checkbox, CheckboxProps, FormControlLabel } from '@mui/material';
import { FieldForm } from './types';

// ----------------------------------------------------------------------

type Props = FieldForm<CheckboxProps> & {
  label: string;
};

export default function RHFCheckbox(props: Props) {
  const { name, label, defaultChecked = false, onChange, readOnly, disabled, ...checkboxProps } = props;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultChecked}
      render={({ field }) => {
        return (
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                onChange={(e, checked) => {
                  field.onChange(e, checked);
                  onChange?.(e, checked);
                }}
                checked={!!field.value}
                disabled={readOnly || disabled}
                {...checkboxProps}
              />
            }
            label={label}
          />
        );
      }}
    />
  );
}
