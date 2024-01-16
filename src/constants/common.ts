import i18n from '@/locales';

const REQUEST_TIMEOUT = 30 * 1000; // 30s

const COLOR_STATUS_MAPPING = {
  actionStatus: {
    active: {
      key: 'active',
      title: i18n.t('label.active'),
      color: 'success.main',
      bgcolor: 'success.light',
    },
    deactive: {
      key: 'deactive',
      title: i18n.t('label.deactive'),
      color: 'info.main',
      bgcolor: 'info.light',
    },
  },
};

export { REQUEST_TIMEOUT, COLOR_STATUS_MAPPING };
