import { createBusinessRootAccountHandler } from './handlers/createBusinessRootAccount.handler';
import { verifyUserDetailsHandler } from './handlers/verifyUserDetails.handler';
import { createBusinessRootUserHandler } from './handlers/createBusinessRootUser.handler';
import { editUserAccountHandler } from './handlers/editUserAccount.handler';
import { isUserABusinessAdmin } from './handlers/isUserBusinessAdmin.handler';
import { getUserHandler } from './handlers/getUserHandler.handler';
import { uploadAdminPassportHandler } from './handlers/uploadAdminPassport.handler';
import { getUserFullDetailsHandler } from './handlers/getUserFullDetails.handler';
import { createMockBusinessAccounts } from './handlers/createMockBusinessAccounts.handler';
export const AccountService = {
  createBusinessRootAccountHandler,
  createBusinessRootUserHandler,
  verifyUserDetailsHandler,
  editUserAccountHandler,
  isUserABusinessAdmin,
  getUserHandler,
  uploadAdminPassportHandler,
  getUserFullDetailsHandler,
  createMockBusinessAccounts,
};
