import { AdminHeader } from '@/components/header';
import i18n from '@/locales';
import { Box, Button, InputAdornment, Stack, TextField } from '@mui/material';
import Helmet from 'react-helmet';
import { Icon } from '@iconify/react';
import { Column, TableCustom, useTable } from '@/components/table';
import { useGetUsersByRole } from '@/hooks/react-query';
import { useState } from 'react';
import { AccountResponse } from '@/api/user';
import { SYSTEM_PERMISSIONS_MAPPING } from '@/constants/label';
import { useDebounce } from '@/hooks';
import { StatusBadge } from '@/components/status-badge';
import { COLOR_STATUS_MAPPING } from '@/constants';

const columns: Column<AccountResponse>[] = [
  {
    key: 'name',
    title: i18n.t('label.subAdminName'),
    sortBy: 'name',
  },
  {
    key: 'emailAddress',
    title: i18n.t('label.email'),
    sortBy: 'emailAddress',
  },
  {
    key: 'phoneNumber',
    title: i18n.t('label.phoneNumber'),
  },
  {
    key: 'permissionList',
    title: i18n.t('label.allowedModules'),
    render: (record) =>
      record.permissionList.map((item) => SYSTEM_PERMISSIONS_MAPPING[item]).join(', '),
  },
  {
    key: 'action',
    title: i18n.t('label.action'),
    render: (record) => {
      const status = record.isActive
        ? COLOR_STATUS_MAPPING.actionStatus.active
        : COLOR_STATUS_MAPPING.actionStatus.deactive;

      return (
        <StatusBadge
          type={'actionStatus'}
          status={status.key}
          title={status.title}
          sx={{ position: 'relative', left: '-10px' }}
        />
      );
    },
  },
];

export default function SubAdminPage() {
  const table = useTable({
    defaultSortBy: 'name',
  });

  const [searchKey, setSearchKey] = useState<string>('');
  const debouncedKey = useDebounce(searchKey);

  const { data, isLoading } = useGetUsersByRole({
    keyword: debouncedKey,
    sortBy: table.sortBy,
    sortOrder: table.sortOrder,
    role: 'SubAdmin',
    skipCount: table.page,
    maxResultCount: table.rowsPerPage,
  });

  return (
    <>
      <Helmet>
        <title>{i18n.t('title.subAdminManagement')}</title>
      </Helmet>

      <Box bgcolor={'background.paper'} height={'100%'} overflow={'auto'}>
        <AdminHeader
          title={i18n.t('title.subAdminManagement')}
          actions={[
            <Button variant={'contained'} startIcon={<Icon icon="ic:baseline-plus" />}>
              {i18n.t('label.createSubAdmin')}
            </Button>,
          ]}
        />

        <Stack padding={'12px 16px'}>
          <TextField
            size="small"
            sx={{ maxWidth: '480px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="iconamoon:search" />
                </InputAdornment>
              ),
            }}
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />

          <TableCustom
            table={table}
            columns={columns}
            dataSource={data?.items}
            isLoading={isLoading}
            totalCount={data?.totalCount}
          />
        </Stack>
      </Box>
    </>
  );
}
