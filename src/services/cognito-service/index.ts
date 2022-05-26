import { getUserStatusHandler } from './functions/getUserStatus.handler';
import { signUpCognitoHandler } from './functions/signUp.handler';
import { updateUserAttributes } from './functions/updateUserAttr.handler';
import { resendConfirmationCodeHandler } from './functions/resendConfirmationCode.handler';

export const CognitoService = {
  getUserStatusHandler,
  signUpCognitoHandler,
  updateUserAttributes,
  resendConfirmationCodeHandler,
};
