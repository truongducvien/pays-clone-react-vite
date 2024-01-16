import { Box, IconButton, MenuItem, TextField, TextFieldProps, Typography, alpha, useTheme } from '@mui/material';
import { AsYouType } from 'libphonenumber-js';
import { useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Country, useCountries } from '~/hooks/useCountries';
import Iconify from '../iconify';
import MenuPopover from '../menu-popover';
import { FieldForm } from './types';

type Props = FieldForm<TextFieldProps> & {
  countryName?: string;
};

export default function RHFPhoneInput(props: Props) {
  const { name, countryName = '', defaultValue, ...inputProps } = props;
  const theme = useTheme();

  const {
    formState: { errors },
    setValue,
    watch,
    control,
  } = useFormContext();
  const country = watch(countryName);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { data } = useCountries();

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleSelectCountry = (it: Country) => {
    setValue(countryName, it.code, { shouldDirty: true });
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
    handleClosePopover();
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue ?? ''}
        render={({ field, fieldState: { error } }) => {
          const value = new AsYouType(country || undefined).input(field.value || '');
          return (
            <TextField
              fullWidth
              error={!!error?.message || !!errors?.[countryName]}
              helperText={(errors?.[countryName]?.message || error?.message) as string}
              {...field}
              value={value}
              {...inputProps}
              inputRef={inputRef}
              InputProps={{
                startAdornment: countryName && (
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    whiteSpace={'pre'}
                    ml={-0.75}
                    pr={1}
                    mr={1}
                    borderRight={'1px solid'}
                    borderColor={alpha(theme.palette.grey[500], 0.32)}
                  >
                    <IconButton onClick={handleOpenPopover}>
                      {country ? (
                        <Typography className={`fi fi-${country.toLowerCase()}`} />
                      ) : (
                        <Iconify icon='tabler:flag-plus' />
                      )}
                    </IconButton>
                    <Typography color={theme.palette.grey[500]}>
                      {data?.find((it) => it.code === country)?.phone_code}
                    </Typography>
                  </Box>
                ),
              }}
            />
          );
        }}
      />

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow='top-left'
        sx={{ overflowY: 'auto', p: 0 }}
        disabledArrow
      >
        {data?.map((it) => (
          <MenuItem key={it.code} sx={{ m: 1 }} onClick={() => handleSelectCountry(it)}>
            <Typography className={`fi fi-${it.code.toLowerCase()}`} />
            &nbsp; &nbsp;
            <Typography flex={1} pr={2}>
              {it?.name}
            </Typography>
            <Typography> {it?.phone_code}</Typography>
          </MenuItem>
        ))}
      </MenuPopover>
    </>
  );
}
