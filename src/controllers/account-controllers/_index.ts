import { createBusinessAccount } from './createBusinessAccount.controller';
import { createMockBusinessAccounts } from './createMockBusinessAccounts.controller';
import { getUser } from './getUser.controller';
import { getUserFullDetails } from './getUserFullDetails.controller';
import { uploadAdminPassport } from './uploadAdminPassport.controller';
import { verifyUserDetails } from './verifyUserDetails.controller';

export const AccountController = {
  createBusinessAccount,
  createMockBusinessAccounts,
  getUser,
  getUserFullDetails,
  uploadAdminPassport,
  verifyUserDetails,
};
