import { Box, Stack, SxProps, Tooltip } from '@mui/material';
import { Theme } from '@mui/material/styles';
//
import Image from '../image';
import DownloadButton from './DownloadButton';
import { fileData, fileFormat, fileThumb } from './utils';

// ----------------------------------------------------------------------

type FileIconProps = {
  file: File | string;
  tooltip?: boolean;
  onDownload?: VoidFunction;
  sx?: SxProps<Theme>;
  imgSx?: SxProps<Theme>;
};

export default function FileThumbnail({ file, tooltip, onDownload, sx, imgSx }: FileIconProps) {
  const { name = '', path = '', preview = '' } = fileData(file);

  const format = fileFormat(path || preview);

  const renderContent =
    format === 'image' ? (
      <Image
        src={preview}
        sx={{
          width: 100,
          height: 100,
          flexShrink: 0,
          ...imgSx,
        }}
      />
    ) : (
      <Box
        component='img'
        src={fileThumb(format)}
        sx={{
          width: 32,
          height: 32,
          flexShrink: 0,
          ...sx,
        }}
      />
    );

  if (tooltip) {
    return (
      <Tooltip title={name}>
        <Stack
          flexShrink={0}
          component='span'
          alignItems='center'
          justifyContent='center'
          sx={{
            width: 'fit-content',
            height: 'inherit',
          }}
        >
          {renderContent}
          {onDownload && <DownloadButton onDownload={onDownload} />}
        </Stack>
      </Tooltip>
    );
  }

  return (
    <>
      {renderContent}
      {onDownload && <DownloadButton onDownload={onDownload} />}
    </>
  );
}
