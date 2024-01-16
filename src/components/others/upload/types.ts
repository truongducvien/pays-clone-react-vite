import { DropzoneOptions } from 'react-dropzone';
// @mui
import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

export interface CustomFile extends File {
  path?: string;
  preview?: string;
  lastModifiedDate?: Date;
}

export interface UploadProps extends DropzoneOptions {
  readOnly?: boolean;
  error?: boolean;
  sx?: SxProps<Theme>;
  description?: ReactNode;
  maxSize?: number;
  //
  file?: CustomFile | string | null;
  onDelete?: VoidFunction;
  //
  files?: (File | string)[];
  onRemove?: (file: CustomFile | string) => void;
  onRemoveAll?: VoidFunction;
}
