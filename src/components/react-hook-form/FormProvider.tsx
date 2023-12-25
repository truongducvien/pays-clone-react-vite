import { ReactNode } from 'react';
import { FormProvider as RHFProvider, UseFormReturn } from 'react-hook-form';

interface Props {
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  onSubmit?: () => void;
}

export default function FormProvider(props: Props) {
  const { children, form, onSubmit } = props;

  return (
    <RHFProvider {...form}>
      <form onSubmit={onSubmit}>{children}</form>
    </RHFProvider>
  );
}
