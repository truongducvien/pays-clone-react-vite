// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { Autocomplete, AutocompleteProps, ChipTypeMap, TextField, darken, lighten, styled } from '@mui/material';
import { FieldForm } from './types';

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === 'light'
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled('ul')({
  padding: 0,
});

export default function RHFAutocomplete<
  Value extends Record<string, any> & { value: any; label: string },
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
>({
  name,
  multiple,
  freeSolo,
  defaultValue,
  onChange,
  onInputChange,
  label,
  renderInput,
  required,
  ...other
}: FieldForm<
  Omit<AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>, 'renderInput'> & {
    renderInput?: AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>['renderInput'];
  }
>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? (multiple ? [] : null)}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          fullWidth
          multiple={multiple}
          freeSolo={freeSolo}
          renderInput={
            renderInput ??
            ((params) => (
              <TextField {...params} required={required} label={label} error={!!error} helperText={error?.message} />
            ))
          }
          getOptionLabel={(option) => {
            if (typeof option === 'string') return option;
            if (option.label) {
              return option.label;
            } else {
              return other.options?.find((it) => it.value === option.value)?.label || '';
            }
          }}
          renderGroup={(params) => (
            <li key={params.key}>
              <GroupHeader>{params.group}</GroupHeader>
              <GroupItems>{params.children}</GroupItems>
            </li>
          )}
          isOptionEqualToValue={(option, currentOption) => {
            return option.value === currentOption.value;
          }}
          onInputChange={(e, value, reason) => {
            !multiple && freeSolo ? field.onChange(value) : null;
            onInputChange?.(e, value, reason);
          }}
          onChange={(e, option, reason, details) => {
            field.onChange(option);
            onChange?.(e, option, reason, details);
          }}
          blurOnSelect
          {...other}
        />
      )}
    />
  );
}
