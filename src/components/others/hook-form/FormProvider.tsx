import { Box, BoxProps } from '@mui/material';
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = BoxProps<'form'> & {
  children: React.ReactNode;
  form: UseFormReturn<any>;
  onSubmit?: () => Promise<void> | void;
};

export default function FormProvider({ children, onSubmit, form, ...other }: Props) {
  return (
    <Form {...form}>
      <Box
        component={'form'}
        onSubmit={(e: any) => {
          e.preventDefault();
          onSubmit?.();
        }}
        noValidate
        {...other}
      >
        {children}
      </Box>
    </Form>
  );
}
