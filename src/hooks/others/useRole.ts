import { intersection } from 'lodash-es';
import { SystemPermission, SystemRole, useGetApiServicesAppAccountGetCurrentUserInfo } from '~/api';
import { IRoleBasedGuard } from '~/auth/types';
import { ADMIN_ROLE } from '~/constants';

const useRole = () => {
  const { data: user } = useGetApiServicesAppAccountGetCurrentUserInfo();

  const roleList = user?.roleList || [];
  const permissionList = user?.permissionList || [];

  const canApproveMerchantUpload =
    !permissionList.includes(SystemPermission.ApprovalRequired) || roleList.includes(ADMIN_ROLE);
  const canUpdateMerchantData =
    !permissionList.includes(SystemPermission.ApprovalRequired) || roleList.includes(ADMIN_ROLE);

  const canAccessRoute = ({ roles = [], permissions = [], exactlyRole }: IRoleBasedGuard) => {
    const currentRole = user?.roleList || [];
    const currentPermissions = user?.permissionList || [];

    return (
      (intersection(roles, currentRole).length === roles?.length &&
        intersection(permissions, currentPermissions).length === permissions?.length) ||
      (currentRole.includes(ADMIN_ROLE) && !exactlyRole)
    );
  };

  const canApproveVoucher =
    !permissionList.includes(SystemPermission.ApprovalRequired) || roleList.includes(ADMIN_ROLE);

  const canEditVoucher = !permissionList.includes(SystemPermission.ApprovalRequired) || roleList.includes(ADMIN_ROLE);

  const isMerchant = roleList.includes(SystemRole.Merchant);

  return {
    canApproveMerchantUpload,
    canUpdateMerchantData,
    canAccessRoute,
    canApproveVoucher,
    canEditVoucher,
    isMerchant,
  };
};

export default useRole;
