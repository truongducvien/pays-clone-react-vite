import {
  Box,
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectProps,
  Typography,
} from '@mui/material';
import { ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FieldForm } from './types';

type Props = FieldForm<SelectProps> & {
  showCheckbox?: boolean;
  options: { label?: ReactNode; value?: string | number }[];
  onSelectItem?: (_?: string | number) => void;
};

export default function RHFSelect(props: Props) {
  const {
    name,
    label,
    multiple = false,
    options,
    defaultValue,
    size,
    required,
    onSelectItem,
    showCheckbox = true,
    ...selectProps
  } = props;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? (multiple ? [] : '')}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error?.message} size={size} required={required}>
          <InputLabel>{label}</InputLabel>
          <Select
            fullWidth
            multiple={multiple}
            input={<OutlinedInput label={label} />}
            renderValue={(value) => {
              if (Array.isArray(value)) {
                return (
                  <Box display={'flex'} flexWrap={'wrap'} gap={1}>
                    {value.map((it) => (
                      <Box
                        key={it}
                        display={'inline-flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        border='1px solid'
                        borderColor={'grey.300'}
                        px={1.25}
                        borderRadius={'14px'}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Typography component={'div'} variant='body2' lineHeight={1.4}>
                          {options.find((item) => item.value === it)?.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                );
              } else {
                const label = options.find((it) => it.value === value)?.label;
                return label;
              }
            }}
            {...field}
            {...selectProps}
          >
            {options?.map((item) => (
              <MenuItem key={item.value} value={item.value} onClick={() => onSelectItem && onSelectItem(item.value)}>
                {multiple && showCheckbox && <Checkbox checked={field.value?.indexOf(item.value) > -1} />}
                <ListItemText primary={item.label} />
              </MenuItem>
            ))}
          </Select>
          {error?.message && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
