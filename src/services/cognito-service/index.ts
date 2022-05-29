import { getUserStatusHandler } from './handlers/getUserStatus.handler';
import { signUpCognitoHandler } from './handlers/signUp.handler';
import { updateUserAttributes } from './handlers/updateUserAttr.handler';
import { resendConfirmationCodeHandler } from './handlers/resendConfirmationCode.handler';
import { confirmEmailCognitoHandler } from './handlers/confirmEmail.handler';
import { confirmSignUpCognitoHandler } from './handlers/confirmSignUp.handler';
import { resetUserPasswordHandler } from './handlers/resetPassword.handler';
import { setInitialUserPasswordHandler } from './handlers/setInitialPassword.handler';
import { signInCognitoHandler } from './handlers/signIn.handler';
import { logoutUserHandler } from './handlers/logout.handler';
import { refreshTokenSignInCognitoHandler } from './handlers/refreshTokenSignIn.handler';
import { createAuthChallengeHandler } from './handlers/triggers/createAuthChallenge.handler';
import { defineAuthChallengeHandler } from './handlers/triggers/defineAuthChallenge.handler';
import { verifyAuthChallengeHandler } from './handlers/triggers/verifyAuthChallenge.handler';
import { initiateCustomAuthHandler } from './handlers/initiateCustomAuth.handler';
import { respondToSignInChallengeHandler } from './handlers/respondToSignInChallenge.handler';
import { respondToResetPassChallengeHandler } from './handlers/respondToResetPassChallenge.handler';

export const CognitoService = {
  getUserStatusHandler,
  signUpCognitoHandler,
  updateUserAttributes,
  resendConfirmationCodeHandler,
  confirmEmailCognitoHandler,
  confirmSignUpCognitoHandler,
  resetUserPasswordHandler,
  setInitialUserPasswordHandler,
  signInCognitoHandler,
  logoutUserHandler,
  refreshTokenSignInCognitoHandler,
  createAuthChallengeHandler,
  defineAuthChallengeHandler,
  verifyAuthChallengeHandler,
  initiateCustomAuthHandler,
  respondToSignInChallengeHandler,
  respondToResetPassChallengeHandler,
};
