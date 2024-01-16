import { forwardRef, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// @mui
import { Box } from '@mui/material';
//
import { API_URL } from '~/config';
import { axiosInstance } from '~/utils/axios';
import { isValidHttpUrl } from '~/utils/common';
import getRatio from './getRatio';
import { ImageProps } from './types';

const Image = forwardRef<HTMLSpanElement, ImageProps>(
  ({ ratio, disabledEffect = false, effect = 'blur', sx, objectFit = 'cover', src: initSrc, ...other }, ref) => {
    const [src, setSrc] = useState<string>();

    useEffect(() => {
      if (
        typeof initSrc === 'string' &&
        !isValidHttpUrl(initSrc) &&
        !initSrc.startsWith('blob:') &&
        !initSrc.startsWith('/fe-public-icons') &&
        !initSrc.startsWith('/fe-public-images')
      ) {
        if (initSrc.endsWith('.svg')) {
          axiosInstance
            .get(`/api/services/app/Image/GetImage`, { params: { url: initSrc } })
            .then((res) => {
              const base64Data = btoa(res.data);
              const src = 'data:image/svg+xml;base64,' + base64Data;
              setSrc(src);
            })
            .catch(() => null);
        } else {
          setSrc(`${API_URL}/api/services/app/Image/GetImage?url=${initSrc}`);
        }
      } else {
        setSrc(initSrc);
      }
    }, [initSrc]);

    const content = (
      <Box
        component={LazyLoadImage}
        wrapperClassName='wrapper'
        effect={disabledEffect ? undefined : effect}
        placeholderSrc={disabledEffect ? '/fe-public-images/transparent.png' : '/fe-public-images/placeholder.svg'}
        sx={{ width: 1, height: 1, objectFit }}
        src={src}
        {...other}
      />
    );

    if (ratio) {
      return (
        <Box
          ref={ref}
          component='span'
          sx={{
            width: 1,
            lineHeight: 1,
            display: 'block',
            overflow: 'hidden',
            position: 'relative',
            pt: getRatio(ratio),
            '& .wrapper': {
              top: 0,
              left: 0,
              width: 1,
              height: 1,
              position: 'absolute',
              backgroundSize: 'cover !important',
            },
            ...sx,
          }}
        >
          {content}
        </Box>
      );
    }

    return (
      <Box
        ref={ref}
        component='span'
        sx={{
          lineHeight: 1,
          display: 'block',
          overflow: 'hidden',
          position: 'relative',
          '& .wrapper': {
            width: 1,
            height: 1,
            backgroundSize: 'cover !important',
          },
          ...sx,
        }}
      >
        {content}
      </Box>
    );
  }
);

export default Image;
