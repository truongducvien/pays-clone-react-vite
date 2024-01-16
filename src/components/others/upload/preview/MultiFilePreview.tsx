import { AnimatePresence, m } from 'framer-motion';
// @mui
import { IconButton, Stack, Typography } from '@mui/material';
// utils
import { fData } from '~/utils/formatNumber';
//
import { varFade } from '../../animate';
import FileThumbnail, { fileData } from '../../file-thumbnail';
import Iconify from '../../iconify';
//
import { UploadProps } from '../types';

// ----------------------------------------------------------------------

export default function MultiFilePreview({ files, onRemove, sx }: UploadProps) {
  if (!files?.length) {
    return null;
  }

  return (
    <AnimatePresence initial={false}>
      {files.map((file) => {
        const { key, name = '', size = 0 } = fileData(file);

        const isNotFormatFile = typeof file === 'string';

        return (
          <Stack
            key={key}
            component={m.div}
            {...varFade().inUp}
            spacing={2}
            direction='row'
            alignItems='center'
            sx={{
              my: 1,
              px: 1,
              py: 0.75,
              borderRadius: 0.75,
              border: (theme) => `solid 1px ${theme.palette.divider}`,
              ...sx,
            }}
          >
            <FileThumbnail file={file} />

            <Stack flexGrow={1} sx={{ minWidth: 0 }}>
              <Typography variant='subtitle2' noWrap>
                {isNotFormatFile ? file : name}
              </Typography>

              <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                {isNotFormatFile ? '' : fData(size)}
              </Typography>
            </Stack>

            {onRemove && (
              <IconButton edge='end' size='small' onClick={() => onRemove(file)}>
                <Iconify icon='eva:close-fill' />
              </IconButton>
            )}
          </Stack>
        );
      })}
    </AnimatePresence>
  );
}
