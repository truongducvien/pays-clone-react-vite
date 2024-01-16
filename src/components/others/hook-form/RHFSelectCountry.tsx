import { Box, SelectProps, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useCountries } from '~/hooks/useCountries';
import RHFSelect from './RHFSelect';
import { FieldForm } from './types';

type Props = FieldForm<SelectProps>;

export default function RHFSelectCountry(props: Props) {
  const { data: countries } = useCountries();
  const countryOptions = useMemo(() => {
    return (
      countries?.map((it) => ({
        label: (
          <Box display={'flex'} alignItems={'center'}>
            <Typography className={`fi fi-${it.code.toLowerCase()}`} />
            &nbsp; &nbsp;
            <Typography flex={1} pr={2}>
              {it?.name}
            </Typography>
          </Box>
        ),
        value: it.id,
      })) || []
    );
  }, [countries]);

  return (
    <RHFSelect
      {...props}
      options={countryOptions}
      renderValue={(value: any) => {
        const country = countries?.find((it) => it.id === value);
        if (country) {
          return (
            <Box display={'flex'} alignItems={'center'}>
              <Typography className={`fi fi-${country.code.toLowerCase()}`} />
              &nbsp; &nbsp;
              <Typography flex={1} pr={2} lineHeight={1.4}>
                {country?.name}
              </Typography>
            </Box>
          );
        }
        return value;
      }}
    />
  );
}
