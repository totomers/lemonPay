import { getUserHandler } from '../account-service/getUserHandler.handler';
import { signUpCognitoHandler } from './signUp.handler';
import { updateUserAttributes } from './updateUserAttr.handler';
import { resendConfirmationCodeHandler } from './resendConfirmationCode.handler';

export const CognitoService = {
  getUserHandler,
  signUpCognitoHandler,
  updateUserAttributes,
  resendConfirmationCodeHandler,
};
