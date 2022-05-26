import { createBusinessAccountHandler } from './createBusinessAccount.handler';
import { verifyUserDetailsHandler } from './verifyUserDetails.handler';
import { createAdminUserHandler } from './createAdminUser.handler';
import { editUserAccountHandler } from './editUserAccount.handler';
import { isUserABusinessAdmin } from './isUserBusinessAdmin.handler';
import { getUserHandler } from './getUserHandler.handler';
import { upl } from './uploadAdminPassport.handler';

export const AccountService = {
  createBusinessAccountHandler,
  createAdminUserHandler,
  verifyUserDetailsHandler,
  editUserAccountHandler,
  isUserABusinessAdmin,
  getUserHandler,
  uploadAdminPassportHandler,
  addReferrerToUserHandler,
};
