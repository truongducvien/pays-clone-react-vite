import { FormProvider, TextFieldCustom } from '@/components/react-hook-form';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Box, Button, IconButton, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormValuesProps {
  customField: string;
}

export default function Test() {
  const form = useForm<FormValuesProps>();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = (value: unknown) => {
    console.log('Submit: ', value);
  };

  return (
    <Box height={'40vh'} width={'60vw'} border={'1px dashed'}>
      <FormProvider form={form} onSubmit={form.handleSubmit(onSubmit)}>
        <TextFieldCustom
          type={showPassword ? 'text' : 'password'}
          label="Custom field"
          name="customField"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Icon icon="mdi:eye" /> : <Icon icon="mdi:eye-off" />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant={'contained'}>
          Submit
        </Button>
      </FormProvider>
    </Box>
  );
}
