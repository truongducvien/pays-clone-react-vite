import { IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import i18n from '@/locales';
import { FormProvider, TextFieldCustom } from '@/components/react-hook-form';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { APIS } from '@/api';
import { LogInPayload, LogInResponse } from '@/api/auth';
import useAuthContext from '@/auth/useAuthContext';
import LoadingButton from '@mui/lab/LoadingButton';
import { AxiosError } from 'axios';
import { ErrorResponse, handleAxiosError } from '@/utils';

interface FormValuesTypes {
  email: string;
  password: string;
}

const yupSchema = yup.object({
  email: yup
    .string()
    .email(i18n.t('validation.emailFormat'))
    .required(i18n.t('validation.emailRequired')),
  password: yup
    .string()
    .required(i18n.t('validation.passwordRequired'))
    .test('Password length', i18n.t('validation.passwordLength'), (schema) => schema.length > 10),
});

export default function LogInForm() {
  const { handleLogIn } = useAuthContext();

  const form = useForm<FormValuesTypes>({
    resolver: yupResolver(yupSchema),
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutate, isLoading } = useMutation<LogInResponse, AxiosError<ErrorResponse>, LogInPayload>(
    {
      mutationFn: APIS.logIn,
    }
  );

  const onSubmit = ({ email, password }: FormValuesTypes) => {
    const submitData: LogInPayload = {
      userNameOrEmailAddress: email,
      password,
    };

    mutate(submitData, {
      onSuccess: (data: LogInResponse) => {
        handleLogIn(data);
      },
      onError: handleAxiosError,
    });
  };

  return (
    <Stack>
      <Typography variant="h2">{i18n.t('title.signInToPAYS')}</Typography>

      <FormProvider form={form} onSubmit={form.handleSubmit(onSubmit)}>
        <TextFieldCustom name="email" type="email" label={i18n.t('label.email')} />
        <TextFieldCustom
          name="password"
          label={i18n.t('label.password')}
          type={showPassword ? 'text' : 'password'}
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
        <LoadingButton
          type="submit"
          loading={isLoading}
          variant={'contained'}
          fullWidth
          sx={{ marginTop: '20px' }}
        >
          {i18n.t('label.login')}
        </LoadingButton>
      </FormProvider>
    </Stack>
  );
}
