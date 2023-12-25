export type FieldForm<T> = T & {
  name: string;
  label?: string;
  defaultValue?: unknown;
};
