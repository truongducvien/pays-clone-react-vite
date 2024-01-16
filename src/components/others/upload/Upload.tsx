import { useDropzone } from 'react-dropzone';
// @mui
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
//
import Iconify from '../iconify';
//
import { useLocales } from '~/locales';
import { reactZoneFileValidator } from '~/utils/common';
import { fData } from '~/utils/formatNumber';
import RejectionFiles from './errors/RejectionFiles';
import MultiFilePreview from './preview/MultiFilePreview';
import SingleFilePreview from './preview/SingleFilePreview';
import { UploadProps } from './types';

// ----------------------------------------------------------------------

const StyledDropZone = styled('div')(({ theme }) => ({
  outline: 'none',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(4, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  border: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
  '&:hover': {
    opacity: 0.72,
  },
}));

// ----------------------------------------------------------------------

export default function Upload({
  readOnly,
  disabled,
  multiple = false,
  maxSize = 10e6,
  maxFiles = 1,
  error,
  //
  file,
  onDelete,
  //
  files,
  onRemove,
  onRemoveAll,
  description,
  sx,
  ...other
}: UploadProps) {
  const { translate } = useLocales();
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple,
    disabled: disabled || readOnly,
    validator: (file) => reactZoneFileValidator({ file, maxSize, multiple, maxFiles, totalFile: files?.length }),
    ...other,
  });

  const hasFile = !!file && !multiple;

  const hasFiles = files && multiple && files.length > 0;

  const isError = isDragReject || !!error;

  return (
    <Box sx={{ width: 1, position: 'relative', ...sx }}>
      <StyledDropZone
        {...getRootProps()}
        sx={{
          ...(isDragActive && {
            opacity: 0.72,
          }),
          ...(isError && {
            color: 'error.main',
            bgcolor: 'error.lighter',
            borderColor: 'error.light',
          }),
          ...((disabled || readOnly) && {
            opacity: disabled ? 0.48 : 1,
            pointerEvents: 'none',
          }),
        }}
      >
        <input {...getInputProps()} />

        <Stack
          spacing={2}
          alignItems='center'
          justifyContent='center'
          direction={{
            xs: 'column',
            md: 'row',
          }}
          sx={{
            width: 1,
            textAlign: {
              xs: 'center',
              md: 'left',
            },
            ...(hasFile && {
              opacity: 0,
            }),
          }}
        >
          <Box textAlign={'center'}>
            <Iconify icon='bytesize:upload' width={24} />
            <Typography
              variant='caption'
              sx={{
                mx: 'auto',
                display: 'block',
                textAlign: 'center',
                color: 'text.secondary',
              }}
            >
              {description || (
                <>
                  {translate('label.allowedFileType', { type: '*.png, *.jpeg, *.jpg, *.HEIC' })}
                  <br />
                  {translate('label.maxSize', { size: fData(maxSize) })}
                </>
              )}
            </Typography>
            <Iconify mt={1} mb={-1} icon='ph:plus-fill' color='primary.main' width={40} />
          </Box>
        </Stack>

        {hasFile && <SingleFilePreview file={file} />}
      </StyledDropZone>

      <RejectionFiles fileRejections={fileRejections} />

      {hasFile && onDelete && !disabled && !readOnly && (
        <IconButton
          size='small'
          onClick={onDelete}
          sx={{
            top: 16,
            right: 16,
            zIndex: 9,
            position: 'absolute',
            color: (theme) => alpha(theme.palette.common.white, 0.8),
            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
            },
          }}
        >
          <Iconify icon='eva:close-fill' width={18} />
        </IconButton>
      )}

      {hasFiles && (
        <>
          <Box sx={{ my: 3 }}>
            <MultiFilePreview files={files} onRemove={readOnly || disabled ? undefined : onRemove} />
          </Box>

          <Stack direction='row' justifyContent='flex-end' spacing={1.5}>
            {onRemoveAll && !readOnly && !disabled && (
              <Button color='inherit' variant='outlined' size='small' onClick={onRemoveAll}>
                {translate('label.removeAll')}
              </Button>
            )}
          </Stack>
        </>
      )}
    </Box>
  );
}
