import { createBusinessAccountHandler } from './handlers/createBusinessAccount.handler';
import { verifyUserDetailsHandler } from './handlers/verifyUserDetails.handler';
import { createAdminUserHandler } from './handlers/createAdminUser.handler';
import { editUserAccountHandler } from './handlers/editUserAccount.handler';
import { isUserABusinessAdmin } from './handlers/isUserBusinessAdmin.handler';
import { getUserHandler } from './handlers/getUserHandler.handler';
import { uploadAdminPassportHandler } from './handlers/uploadAdminPassport.handler';
import { getBusinessAdminListHandler } from './handlers/getBusinessAdminList.handler';
import { getUserFullDetailsHandler } from './handlers/getUserFullDetails.handler';
import { createMockBusinessAccounts } from './handlers/createMockBusinessAccounts.handler';
export const AccountService = {
  createBusinessAccountHandler,
  createAdminUserHandler,
  verifyUserDetailsHandler,
  editUserAccountHandler,
  isUserABusinessAdmin,
  getUserHandler,
  uploadAdminPassportHandler,
  getBusinessAdminListHandler,
  getUserFullDetailsHandler,
  createMockBusinessAccounts,
};
