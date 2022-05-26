import { getUserStatusHandler } from './functions/getUserStatus.handler';
import { signUpCognitoHandler } from './functions/signUp.handler';
import { updateUserAttributes } from './functions/updateUserAttr.handler';
import { resendConfirmationCodeHandler } from './functions/resendConfirmationCode.handler';
import { confirmEmailCognitoHandler } from './functions/confirmEmail.handler';
import { confirmSignUpCognitoHandler } from './functions/confirmSignUp.handler';
import { resetUserPasswordHandler } from './functions/resetPassword.handler';
import { setInitialUserPasswordHandler } from './functions/setInitialPassword.handler';

export const CognitoService = {
  getUserStatusHandler,
  signUpCognitoHandler,
  updateUserAttributes,
  resendConfirmationCodeHandler,
  confirmEmailCognitoHandler,
  confirmSignUpCognitoHandler,
  resetUserPasswordHandler,
  setInitialUserPasswordHandler,
};
