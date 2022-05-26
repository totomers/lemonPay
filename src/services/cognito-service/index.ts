import { getUserHandler } from '../account-service/getUserHandler.handler';
import { signUpCognitoHandler } from './functions/signUp.handler';
import { updateUserAttributes } from './functions/updateUserAttr.handler';
import { resendConfirmationCodeHandler } from './functions/resendConfirmationCode.handler';

export const CognitoService = {
  getUserHandler,
  signUpCognitoHandler,
  updateUserAttributes,
  resendConfirmationCodeHandler,
};
