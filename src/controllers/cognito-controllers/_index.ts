import { confirmSignUpUser } from './confirmSignUpUser.controller';
import { createLemonPayAdmin } from './createLemonPayAdmin.controller';
import { getUserStatus } from './getUserStatus.controller';
import { initiateAuthChallengeWithEmail } from './initiateAuthChallengeWithEmail.controller';
import { initiateAuthChallengeWithToken } from './initiateAuthChallengeWithToken.controller';
import { logoutUser } from './logoutUser.controller';
import { refreshTokenSignIn } from './refreshTokenSignIn.controller';
import { resetUserPassword } from './resetUserPassword.controller';
import { respondToResetPassChallenge } from './respondToResetPassChallenge.controller';
import { respondToSignInAuthChallenge } from './respondToSignInAuthChallenge.controller';
import { setUsersInitialPassword } from './setUsersInitialPassword.controller';
import { signInUser } from './signInUser.controller';
import { signInLemonPayAdmin } from './signInLemonPayAdmin.controller';
import { signUpUser } from './signUpUser.controller';
import { resendConfirmationCode } from './resendConfirmationCode.controller';
import { createAuthChallenge } from './trig.createAuthChallenge.controller';
import { defineCustomChallenge } from './trig.defineCustomChallenge.controller';
import { verifyAuthChallenge } from './trig.verifyAuthChallenge.challenge';

export const CognitoController = {
  confirmSignUpUser,
  createLemonPayAdmin,
  getUserStatus,
  initiateAuthChallengeWithEmail,
  initiateAuthChallengeWithToken,
  logoutUser,
  refreshTokenSignIn,
  resetUserPassword,
  respondToResetPassChallenge,
  respondToSignInAuthChallenge,
  resendConfirmationCode,
  setUsersInitialPassword,
  signUpUser,
  signInUser,
  signInLemonPayAdmin,
  createAuthChallenge,
  defineCustomChallenge,
  verifyAuthChallenge,
};
