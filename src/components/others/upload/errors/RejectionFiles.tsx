import { FileRejection } from 'react-dropzone';
// @mui
import { Box, Paper, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
// utils
import { fData } from '~/utils/formatNumber';
//
import { fileData } from '~/components/file-thumbnail';

// ----------------------------------------------------------------------

type Props = {
  fileRejections: FileRejection[];
};

export default function RejectionFiles({ fileRejections }: Props) {
  if (!fileRejections.length) {
    return null;
  }

  return (
    <Paper
      variant='outlined'
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
        borderColor: (theme) => alpha(theme.palette.error.main, 0.24),
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path, size } = fileData(file);

        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant='subtitle2' noWrap>
              {path} - {size ? fData(size) : ''}
            </Typography>

            <Box display={'flex'} flexDirection={'column'}>
              {errors.map((error) => (
                <Box key={error.code} component='span' sx={{ typography: 'caption' }}>
                  - {error.message}
                </Box>
              ))}
            </Box>
          </Box>
        );
      })}
    </Paper>
  );
}