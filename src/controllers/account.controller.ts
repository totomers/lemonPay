import {
  Context,
  CreateAuthChallengeTriggerEvent,
  DefineAuthChallengeTriggerEvent,
  VerifyAuthChallengeResponseTriggerEvent,
} from "aws-lambda";
import { AccountService } from "../services/account.service";
import { CognitoService } from "src/services/cognito.service";
import { MissingParamsError } from "src/utils/customError";
import { ParsedAPIGatewayProxyEvent } from "src/utils/api-gateway";

/**
 * Create Business Account
 */
export async function createBusinessAccount(
  event: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const { email, name } = event.requestContext.authorizer.claims;
    const user = { ...event.body.user, email, name };
    const business = event.body.business;

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
 * Verify User Details
 */
export async function verifyUserDetails(
  event: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    //extract business and user details from event
    const { email } = event.requestContext.authorizer.claims;

    if (!email) throw new MissingParamsError("email");
    const data = await AccountService.verifyUserDetailsHandler({
      email,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}

/**
 * Sign Up User To Cognito DB
 */
export async function signUpUser(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { name, email } = event.body;

    if (!name || !email) throw new MissingParamsError("name, email");

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
 * Sign Up User To Cognito DB
 */
export async function resendConfirmationCode(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { email } = event.body;
    if (!email) throw new MissingParamsError("email");
    const data = await CognitoService.resendConfirmationCodeHandler({
      email,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}

/**
 * Send Email With OTP To Confirm Users Email & Add User To Cognito DB If Successful.
 * @returns accessToken,refreshToken,idToken
 */
export async function confirmSignUpUser(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { email, confirmationCode } = event.body;
    if (!confirmationCode || !email)
      throw new MissingParamsError("confirmationCode, email");
    const confirmationResult = await CognitoService.confirmSignUpCognitoHandler(
      {
        confirmationCode,
        email,
      }
    );

    const signInResult = await CognitoService.signInCognitoHandler({
      email,
      password: process.env.COGNITO_USER_DUMMY_PASSWORD,
    });
    return { data: signInResult.AuthenticationResult };
  } catch (err) {
    return { err };
  }
}

/**
 * Change Users Dummy Password Given Upon Sign-Up
 */
export async function setUsersInitialPassword(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { password, accessToken, email } = event.body;

    if (!password || !accessToken || !email)
      throw new MissingParamsError("password, accessToken, email");

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
 * Reset User's Password
 */
export async function resetUserPassword(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { email } = event.requestContext.authorizer.claims;

    if (!email) throw new MissingParamsError("email");

    const data = await CognitoService.resetUserPasswordHandler({
      email,
    });
    return { data };
  } catch (err) {
    return { err, statusCode: err.code };
  }
}
/**
 * Confirm Reset User's Password
 */
export async function confirmResetUserPassword(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { email } = event.requestContext.authorizer.claims;
    const { password, confirmationCode } = event.body;

    if (!password || !confirmationCode || !email)
      throw new MissingParamsError("password, confirmationCode, email");

    const data = await CognitoService.confirmUserPasswordResetHandler({
      email,
      password,
      confirmationCode,
    });
    return { data };
  } catch (err) {
    return { err, statusCode: err.code };
  }
}

/**
 * Sign Up User To Cognito DB
 */
export async function signInUser(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { email, password } = event.body;

    if (!password || !email) throw new MissingParamsError("password, email");
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
 * Sign Up User With Refresh Token
 */
export async function refreshTokenSignIn(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { refreshToken } = event.body;

    if (!refreshToken) throw new MissingParamsError("refreshToken");
    const data = await CognitoService.refreshTokenSignInCognitoHandler({
      refreshToken,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
/**
 * Private- add user to a group with different access control -For Testing Only Make Public
 */
export async function addUserToGroup(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { email, groupName } = event.body;

    if (!groupName || !email) throw new MissingParamsError("groupName, email");
    const data = await CognitoService.addUserToGroupCognitoHandler({
      groupName,
      email,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
/**
 * Get Confirmation Status If User Is Verified Or Not
 */
export async function getVerificationStatus(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { email } = event.requestContext.authorizer.claims;

    if (!email) throw new MissingParamsError("email");
    const data = await CognitoService.getVerificationStatusHandler({
      email,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}

/**
 * Get User Status If User Is Has Changed Password, Has Registered Business & Personal Details */
export async function getUserStatus(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { email } = event.requestContext.authorizer.claims;

    if (!email) throw new MissingParamsError("email");
    const data = await CognitoService.getUserStatusHandler({
      email,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}

/**
 * Define Custom Auth Challenge
 */
export async function defineCustomChallenge(
  event?: DefineAuthChallengeTriggerEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    if (!event) throw new MissingParamsError("event");
    const data = await CognitoService.defineAuthChallengeHandler({ event });
    return { data };
  } catch (err) {
    return { err };
  }
}

/**
 * Create Custom Auth Challenge
 */
export async function createAuthChallenge(
  event?: CreateAuthChallengeTriggerEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    if (!event) throw new MissingParamsError("event");
    const data = await CognitoService.createAuthChallengeHandler({ event });
    return { data };
  } catch (err) {
    return { err };
  }
}
/**
 * Verify Custom Auth Challenge
 */
export async function verifyAuthChallenge(
  event?: VerifyAuthChallengeResponseTriggerEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    if (!event) throw new MissingParamsError("event");
    const data = await CognitoService.verifyAuthChallengeHandler({ event });
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
  setUsersInitialPassword,
  resendConfirmationCode,
  getVerificationStatus,
  resetUserPassword,
  confirmResetUserPassword,
  getUserStatus,
  defineCustomChallenge,
  createAuthChallenge,
  verifyAuthChallenge,
};
