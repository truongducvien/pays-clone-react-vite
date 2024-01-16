import { ReactNode } from 'react';

export type SelectOptions = Array<{
  id?: string | number;
  label: ReactNode;
  value: string;
}>;

export type FieldRegistrationWithHookFormProps<T> = T & {
  name: string;
  label?: ReactNode;
  required?: boolean;
  readOnly?: boolean;
};

export type FieldForm<T> = FieldRegistrationWithHookFormProps<T>;
