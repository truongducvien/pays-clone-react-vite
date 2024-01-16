import { Box, BoxProps } from '@mui/material';

const mappingColor = {
  activeStatus: {
    active: {
      color: 'success.dark',
      bgcolor: 'success.lighter',
    },
    inactive: {
      color: 'info.dark',
      bgcolor: 'info.lighter',
    },
  },
  paymentOption: {
    '1': {
      color: 'info.dark',
      bgcolor: 'info.lighter',
    },
    '2': {
      color: 'success.dark',
      bgcolor: 'success.lighter',
    },
  },
  approvedStatus: {
    Draft: {
      color: 'info.dark',
      bgcolor: 'info.lighter',
    },
    WaitingForApprove: {
      color: 'warning.dark',
      bgcolor: 'warning.lighter',
    },
    Complete: {
      color: 'success.dark',
      bgcolor: 'success.lighter',
    },
  },
  luckyDrawStatus: {
    Active: {
      color: 'success.dark',
      bgcolor: 'success.lighter',
    },
    Expired: {
      color: 'grey.700',
      bgcolor: 'grey.300',
    },
    Inactive: {
      color: 'info.dark',
      bgcolor: 'info.lighter',
    },
  },
  voucherStatus: {
    Draft: {
      color: 'info.dark',
      bgcolor: 'info.lighter',
    },
    PendingApproval: {
      color: 'warning.dark',
      bgcolor: 'warning.lighter',
    },
    Published: {
      color: 'success.dark',
      bgcolor: 'success.lighter',
    },
    Unpublished: {
      color: 'error.dark',
      bgcolor: 'error.lighter',
    },
  },
  voucherCodeStatus: {
    InStock: {
      color: 'success.dark',
      bgcolor: 'success.lighter',
    },
    Sold: {
      color: 'info.dark',
      bgcolor: 'info.lighter',
    },
    Used: {
      color: 'error.dark',
      bgcolor: 'error.lighter',
    },
  },
} as const;

interface Props extends BoxProps {
  type?: keyof typeof mappingColor;
  value?: any;
}

const StatusBadge = (props: Props) => {
  const { type = 'activeStatus', value, children, sx, ...other } = props;

  const color: any = mappingColor[type];

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        fontSize: 12,
        borderRadius: 16,
        fontWeight: 600,
        width: 'fit-content',
        height: 22,
        px: 1,
        color: color?.[value]?.color,
        bgcolor: color?.[value]?.bgcolor,
        whiteSpace: 'pre',
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
};

export default StatusBadge;
