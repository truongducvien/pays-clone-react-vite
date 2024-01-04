import { useGetUserAccount, useGetUserProfile } from '@/hooks/react-query';
import { Avatar, Box, Stack, Tooltip, Typography, alpha, useTheme } from '@mui/material';

export default function AccountSection() {
  const theme = useTheme();

  const { data: userAccount } = useGetUserAccount();
  const { data: userInfo } = useGetUserProfile();

  return (
    <Stack
      direction={'row'}
      borderRadius={'12px'}
      padding={'18px 20px'}
      gap={'16px'}
      bgcolor={alpha(theme.palette.grey[500], 0.08)}
    >
      <Avatar alt={userInfo?.name} src={userInfo?.avatarUrl} />
      <Stack flex={1}>
        <Box width={'100%'} display={'table'} sx={{ tableLayout: 'fixed' }}>
          <Tooltip title={userInfo?.name !== '' ? userInfo?.name : userAccount?.userName}>
            <Typography
              width={'100%'}
              display={'table-cell'}
              variant="caption"
              fontWeight={600}
              textOverflow={'ellipsis'}
              overflow={'hidden'}
              whiteSpace={'nowrap'}
            >
              {userInfo?.name !== '' ? userInfo?.name : userAccount?.userName}
            </Typography>
          </Tooltip>
        </Box>
        <Typography variant="caption">{userAccount?.roleList[0]}</Typography>
      </Stack>
    </Stack>
  );
}
