import DashboardIcon from '@/assets/navbar-icons/DashboardIcon';
import SettingsIcon from '@/assets/navbar-icons/SettingsIcon';
import SubAdminIcon from '@/assets/navbar-icons/SubAdminIcon';
import { ROUTES } from '@/constants';
import i18n from '@/locales';

const menu = [
  {
    subHeader: i18n.t('label.general'),
    items: [
      {
        key: 'dashBoard',
        title: i18n.t('label.dashBoard'),
        icon: <DashboardIcon />,
        path: null,
        permissions: [],
        children: [],
      },
      {
        key: 'setting',
        title: i18n.t('label.setting'),
        icon: <SettingsIcon />,
        path: ROUTES.SETTINGS,
        permissions: [],
        children: [
          {
            key: 'paymentMethod',
            title: i18n.t('label.paymentMethod'),
            icon: null,
            path: ROUTES.PAYMENT_METHOD,
            permissions: [],
          },
        ],
      },
    ],
  },
  {
    subHeader: i18n.t('label.management'),
    items: [
      {
        key: 'subAdmin',
        title: i18n.t('label.subAdmin'),
        icon: <SubAdminIcon />,
        path: ROUTES.SUB_ADMIN,
        permissions: [],
        children: [],
      },
    ],
  },
];

export default menu;
