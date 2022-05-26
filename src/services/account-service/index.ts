import { createBusinessAccountHandler } from './functions/createBusinessAccount.handler';
import { verifyUserDetailsHandler } from './functions/verifyUserDetails.handler';
import { createAdminUserHandler } from './functions/createAdminUser.handler';
import { editUserAccountHandler } from './functions/editUserAccount.handler';
import { isUserABusinessAdmin } from './functions/isUserBusinessAdmin.handler';
import { getUserHandler } from './functions/getUserHandler.handler';
import { uploadAdminPassportHandler } from './functions/uploadAdminPassport.handler';
import { addReferrerToUserHandler } from './functions/addReferrerToUser.handler';

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
