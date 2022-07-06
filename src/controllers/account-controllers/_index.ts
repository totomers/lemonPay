import { createBusinessAccount } from './createBusinessAccount.controller';
import { createMockBusinessAccounts } from './createMockBusinessAccounts.controller';
import { getUser } from './getUser.controller';
import { getUserFullDetails } from './getUserFullDetails.controller';
import { uploadAdminPassport } from './uploadAdminPassport.controller';
import { verifyUserDetails } from './verifyUserDetails.controller';
import { fetchInvitedUser } from './fetchInvitedUsed.controller';
import { changeUserRole } from './changeUserRole.controller';
import { removeUserFromBusiness } from './removeUserFromBusiness.controller';
import { pipedriveTester } from './pipedriveTester.controller';
export const AccountController = {
  createBusinessAccount,
  createMockBusinessAccounts,
  getUser,
  getUserFullDetails,
  uploadAdminPassport,
  verifyUserDetails,
  fetchInvitedUser,
  changeUserRole,
  removeUserFromBusiness,
  pipedriveTester,
};
