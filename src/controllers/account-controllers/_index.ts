import { createBusinessAccount } from './createBusinessAccount.controller';
import { createMockBusinessAccounts } from './createMockBusinessAccounts.controller';
import { getBusinessAdminList } from './getBusinessAdminList.controller';
import { getUser } from './getUser.controller';
import { getUserFullDetails } from './getUserFullDetails.controller';
import { uploadAdminPassport } from './uploadAdminPassport.controller';
import { verifyUserDetails } from './verifyUserDetails.controller';

export const AccountController = {
  createBusinessAccount,
  createMockBusinessAccounts,
  getBusinessAdminList,
  getUser,
  getUserFullDetails,
  uploadAdminPassport,
  verifyUserDetails,
};
