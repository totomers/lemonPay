import {
  Context,
  CreateAuthChallengeTriggerEvent,
  DefineAuthChallengeTriggerEvent,
  VerifyAuthChallengeResponseTriggerEvent,
} from 'aws-lambda';
import { AccountService } from '../services/account-service';
import { CognitoService } from 'src/services/cognito-service';
import { MissingParamsError } from 'src/utils/customError';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';

/**
 * =======================================================================================================
 * Create Business Account
 * =======================================================================================================
 */
export async function createBusinessAccount(
  event: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const email =
      event.requestContext.authorizer?.claims?.email || 'tomere@moveo.co.il';
    const name = event.requestContext.authorizer?.claims?.name || 'tomer eyal';
    if (!email || !name) throw new MissingParamsError('email, name');

    const user = { ...event.body.user, email, name };
    const business = event.body.business;
    //ADD PARAM VALIDATION FOR USER AND BUSINESS
    const data = await AccountService.createBusinessAccountHandler({
      user,
      business,
    });

    return { data };
  } catch (err) {
    return { err };
  }
}

/**
 * =======================================================================================================
 * Verify User Details
 * =======================================================================================================
 */
export async function verifyUserDetails(
  event: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    // TBD: If verification method will need to use a file/image we will use the getFile(event) method below:
    // const file = getFile(event);
    const email = event.requestContext.authorizer?.claims?.email;
    const { image, mime } = event.body;
    if (!image || !mime) throw new MissingParamsError('image, mime');

    const data = await AccountService.verifyUserDetailsHandler({
      email,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}

/**
 * Extract the file from the lambda event.
 * @param event
 * @returns
 */
function getFile(event: ParsedAPIGatewayProxyEvent) {
  const body = event.body;
  console.log('event: ', event);

  const fileName = body
    .split('\r\n')[1]
    .split(';')[2]
    .split('=')[1]
    .replace(/^"|"$/g, '')
    .trim();
  const fileType = fileName.split('.')[1];
  const fileContent = body.split('\r\n')[5].trim();

  console.log('file name', fileName);
  console.log('file type', fileType);
  // console.log("file content", fileContent);
  return fileContent;
}

/**
 * =======================================================================================================
 * Upload Admin's Passport To S3 & Save Url To DB
 * =======================================================================================================
 */
export async function uploadAdminPassport(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { userId, image, mime } = event.body;

    if (!userId || !image || !mime)
      throw new MissingParamsError('userId, image, mime');

    const data = await AccountService.uploadAdminPassportHandler({
      userId,
      image,
      mime,
    });
    return { data };
  } catch (err) {
    console.log(err);

    return { err };
  }
}

/**
 * =======================================================================================================
 * Sign Up User To Cognito DB
 * =======================================================================================================
 */
export async function signUpUser(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { name, email } = event.body;

    if (!name || !email) throw new MissingParamsError('name, email');

    const data = await CognitoService.signUpCognitoHandler({
      name,
      email,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
/**
 * =======================================================================================================
 * Sign Up User To Cognito DB
 * =======================================================================================================
 */
export async function resendConfirmationCode(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { email } = event.body;
    if (!email) throw new MissingParamsError('email');
    const data = await CognitoService.resendConfirmationCodeHandler({
      email,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}

/**
 * =======================================================================================================
 * Send Email With OTP To Confirm Users Email & Add User To Cognito DB If Successful.
 * @returns accessToken,refreshToken,idToken
 * =======================================================================================================
 */
export async function confirmSignUpUser(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { email, confirmationCode } = event.body;
    if (!confirmationCode || !email)
      throw new MissingParamsError('confirmationCode, email');
    const data = await CognitoService.confirmSignUpCognitoHandler({
      confirmationCode,
      email,
    });

    return { data };
  } catch (err) {
    return { err };
  }
}

/**
 * =======================================================================================================
 * Change Users Dummy Password Given Upon Sign-Up
 * =======================================================================================================
 */
export async function setUsersInitialPassword(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { password, accessToken } = event.body;
    const email = event.requestContext.authorizer?.claims?.email;
    if (!password || !accessToken || !email)
      throw new MissingParamsError('password, accessToken, email');

    const result = await CognitoService.setInitialUserPasswordHandler({
      accessToken,
      email,
      password,
    });
    return { data: result };
  } catch (err) {
    return { err };
  }
}

/**
 * =======================================================================================================
 * Reset User's Password
 * =======================================================================================================
 */
export async function resetUserPassword(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { password, accessToken } = event.body;

    if (!password || !accessToken)
      throw new MissingParamsError('password, accessToken');

    const data = await CognitoService.resetUserPasswordHandler({
      password,
      accessToken,
    });
    return { data };
  } catch (err) {
    return { err, statusCode: err.code };
  }
}

// /**
//  * Confirm Reset User's Password
//  */
// export async function confirmResetUserPassword(
//   event?: ParsedAPIGatewayProxyEvent,
//   context?: Context
// ) {
//   context.callbackWaitsForEmptyEventLoop = false;

//   try {
//  const email = event.requestContext.authorizer?.claims?.email;//     const { password, confirmationCode } = event.body;

//     if (!password || !confirmationCode || !email)
//       throw new MissingParamsError("password, confirmationCode, email");

//     const data = await CognitoService.confirmUserPasswordResetHandler({
//       email,
//       password,
//       confirmationCode,
//     });
//     return { data };
//   } catch (err) {
//     return { err, statusCode: err.code };
//   }
// }

/**
 * =======================================================================================================
 * Sign In User With Cognito DB
 * =======================================================================================================
 */
export async function signInUser(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { email, password } = event.body;

    if (!password || !email) throw new MissingParamsError('password, email');
    const data = await CognitoService.signInCognitoHandler({
      password,
      email,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
/**
 * =======================================================================================================
 * Sign In User With Refresh Token
 * =======================================================================================================
 */
export async function refreshTokenSignIn(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    console.log('COOKIE FOUND: ', event.headers.Cookie);

    const { refreshToken } = event.body;

    if (!refreshToken) throw new MissingParamsError('refreshToken');
    const data = await CognitoService.refreshTokenSignInCognitoHandler({
      refreshToken,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}

/**
 * =======================================================================================================
 * Log Out User Cognito DB
 * =======================================================================================================
 */
export async function logoutUser(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { refreshToken } = event.body;

    if (!refreshToken) throw new MissingParamsError('refreshToken');
    const data = await CognitoService.logoutUserHandler({
      refreshToken,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}

/**
 * =======================================================================================================
 * Get User Plain Details And Businesses
 * =======================================================================================================
 */
export async function getUser(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const email =
      event.requestContext.authorizer?.claims?.email || 'tomere@moveo.co.il';
    if (!email) throw new MissingParamsError('email');
    const data = await AccountService.getUserHandler({
      email,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
/**
 * =======================================================================================================
 * Get User Full Details And Businesses
 * =======================================================================================================
 */
export async function getUserFullDetails(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const email =
      event.requestContext.authorizer?.claims?.email || 'tomere@moveo.co.il';
    if (!email) throw new MissingParamsError('email');
    const data = await AccountService.getUserFullDetailsHandler({
      email,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
/**
 * =======================================================================================================
 * Get List Of All Business Owners
 * =======================================================================================================
 */
export async function getBusinessAdminList(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const data = await AccountService.getBusinessAdminListHandler();
    return { data };
  } catch (err) {
    return { err };
  }
}

/**
 * =======================================================================================================
 * Get User Status If User Is Has Changed Password, Has Registered Business & Personal Details
 * =======================================================================================================
 */
export async function getUserStatus(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const email = event.requestContext.authorizer?.claims?.email;
    if (!email) throw new MissingParamsError('email');
    const data = await CognitoService.getUserStatusHandler({
      email,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}

/**
 * =======================================================================================================
 * Define Custom Auth Challenge
 * =======================================================================================================
 */
export async function defineCustomChallenge(
  event?: DefineAuthChallengeTriggerEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    if (!event) throw new MissingParamsError('event');
    const data = await CognitoService.defineAuthChallengeHandler({ event });
    return { data };
  } catch (err) {
    return { err };
  }
}

/**
 * =======================================================================================================
 * Create Custom Auth Challenge
 * =======================================================================================================
 */
export async function createAuthChallenge(
  event?: CreateAuthChallengeTriggerEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    if (!event) throw new MissingParamsError('event');
    const data = await CognitoService.createAuthChallengeHandler({ event });
    return { data };
  } catch (err) {
    return { err };
  }
}
/**
 * =======================================================================================================
 * Verify Custom Auth Challenge
 * =======================================================================================================
 */
export async function verifyAuthChallenge(
  event?: VerifyAuthChallengeResponseTriggerEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    if (!event) throw new MissingParamsError('event');
    const data = await CognitoService.verifyAuthChallengeHandler({ event });
    return { data };
  } catch (err) {
    return { err };
  }
}

/**
 * =======================================================================================================
 * Initiate Custom Auth Challenge With Email
 * =======================================================================================================
 */
export async function initiateAuthChallengeWithEmail(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { email } = event.body;

    if (!email) throw new MissingParamsError('email');
    const data = await CognitoService.initiateCustomAuthHandler({
      email,
      currentAuthChallenge: 'RESETPASS',
    });
    return { data };
  } catch (err) {
    return { err };
  }
}

/**
 * =======================================================================================================
 * Initiate Custom Auth Challenge With Token
 * =======================================================================================================
 */
export async function initiateAuthChallengeWithToken(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const email = event.requestContext.authorizer?.claims?.email;
    if (!email) throw new MissingParamsError('email');
    const data = await CognitoService.initiateCustomAuthHandler({
      email,
      currentAuthChallenge: 'RESETPASS',
    });
    return { data };
  } catch (err) {
    return { err };
  }
}

/**
 * =======================================================================================================
 * Respond To Sign In Auth Challenge
 * =======================================================================================================
 */
export async function respondToSignInAuthChallenge(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { session, confirmationCode, username } = event.body;

    if (!session || !confirmationCode || !username)
      throw new MissingParamsError('session, confirmationCode,username');
    const data = await CognitoService.respondToSignInChallengeHandler({
      session,
      confirmationCode,
      username,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
/**
 * =======================================================================================================
 * Respond To Reset Pass Auth Challenge
 * =======================================================================================================
 */
export async function respondToResetPassChallenge(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { session, confirmationCode, username } = event.body;

    if (!session || !confirmationCode || !username)
      throw new MissingParamsError('session, confirmationCode,username');
    const data = await CognitoService.respondToResetPassChallengeHandler({
      session,
      confirmationCode,
      username,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}

/**
 * =======================================================================================================
 * Create lemon pay admin user
 * =======================================================================================================
 */
export async function createLemonPayAdmin(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { name, email, password } = event.body;

    if (!name || !email || !password)
      throw new MissingParamsError('name, email, password');

    const data = await CognitoService.createLemonPayAdminHandler({
      name,
      email,
      password,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
/**
 * =======================================================================================================
 * Sign In lemon pay admin user
 * =======================================================================================================
 */
export async function signInLemonPayAdmin(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { email, password } = event.body;

    if (!email || !password) throw new MissingParamsError('email, password');

    const data = await CognitoService.signInLemonPayAdminHandler({
      email,
      password,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
export const AccountController = {
  createBusinessAccount,
  verifyUserDetails,
  signUpUser,
  confirmSignUpUser,
  signInUser,
  refreshTokenSignIn,
  logoutUser,
  setUsersInitialPassword,
  resendConfirmationCode,
  resetUserPassword,
  uploadAdminPassport,
  getUserStatus,
  getUser,
  getUserFullDetails,
  defineCustomChallenge,
  createAuthChallenge,
  verifyAuthChallenge,
  initiateAuthChallengeWithEmail,
  initiateAuthChallengeWithToken,
  respondToResetPassChallenge,
  respondToSignInAuthChallenge,
  getBusinessAdminList,
  createLemonPayAdmin,
  signInLemonPayAdmin,
};
