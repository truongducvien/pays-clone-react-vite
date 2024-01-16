import i18n from '@/locales';
import { SYSTEM_PERMISSION } from '.';

const SYSTEM_PERMISSIONS_MAPPING = {
  [SYSTEM_PERMISSION.Dashboard]: i18n.t('label.dashBoard'),
  [SYSTEM_PERMISSION.UploadMerchant]: i18n.t('label.uploadMerchant'),
  [SYSTEM_PERMISSION.Voucher]: i18n.t('label.voucher'),
  [SYSTEM_PERMISSION.LuckyDrawSelection]: i18n.t('label.luckyDraw'),
  [SYSTEM_PERMISSION.Point]: i18n.t('label.point'),
  [SYSTEM_PERMISSION.Setting]: i18n.t('label.setting'),
  [SYSTEM_PERMISSION.SubAdmin]: i18n.t('label.subAdmin'),
  [SYSTEM_PERMISSION.MerchantAccount]: i18n.t('label.merchantAccount'),
  [SYSTEM_PERMISSION.UserConsumer]: `${i18n.t('label.user')} / ${i18n.t('label.consumer')}`,
  [SYSTEM_PERMISSION.ApprovalRequired]: i18n.t('label.approvalRequired'),
};

export { SYSTEM_PERMISSIONS_MAPPING };
