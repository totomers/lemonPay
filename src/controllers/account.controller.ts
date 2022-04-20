import { Context } from "aws-lambda";
import { MessageUtil } from "../utils/message";
import { AccountService } from "../services/account.service";
import { CognitoService } from "src/services/cognito.service";
import { CustomError } from "@libs/customError";

/**
 * Create Business Account
 */
export async function createBusinessAccount(event?: any, context?: Context) {
  context.callbackWaitsForEmptyEventLoop = false;

  //extract business and user details from event
  const user = event.body.user;
  const business = event.body.business;
  try {
    const data = await AccountService.createBusinessAccountHandler({
      user,
      business,
    });
    return { data };
  } catch (err) {
    return { err, statusCode: err.code };
  }
}

/**
 * Verify User Details
 */
export async function verifyUserDetails(event?: any, context?: Context) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    //extract business and user details from event
    const { email, user } = event.body;
    console.log(user, email);
    const data = await AccountService.verifyUserDetailsHandler({
      user,
      email,
    });
    return { data };
  } catch (err) {
    return { err, statusCode: err.code };
  }
}

/**
 * Sign Up User To Cognito DB
 */
export async function signUpUser(event?: any, context?: Context) {
  context.callbackWaitsForEmptyEventLoop = false;
  const { name, email } = event.body;
  console.log(email, name);
  try {
    const data = await CognitoService.signUpCognitoHandler({
      name,
      email,
    });
    return { data };
  } catch (err) {
    return { err, statusCode: err.code };
  }
}
/**
 * Sign Up User To Cognito DB
 */
export async function resendConfirmationCode(event?: any, context?: Context) {
  context.callbackWaitsForEmptyEventLoop = false;
  const { email } = event.body;

  try {
    const data = await CognitoService.resendConfirmationCodeHandler({
      email,
    });
    return { data };
  } catch (err) {
    return { err, statusCode: err.code };
  }
}

/**
 * Send Email With OTP To Confirm Users Email & Add User To Cognito DB If Successful.
 * @returns accessToken,refreshToken,idToken
 */
export async function confirmSignUpUser(event?: any, context?: Context) {
  context.callbackWaitsForEmptyEventLoop = false;
  const { email, confirmationCode } = event.body;
  console.log(email, confirmationCode);
  try {
    const confirmationResult = await CognitoService.confirmSignUpCognitoHandler(
      {
        confirmationCode,
        email,
      }
    );
    console.log("Dummy Password: ", process.env.COGNITO_USER_DUMMY_PASSWORD);

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
export async function setUsersInitialPassword(event?: any, context?: Context) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { password, accessToken, email } = event.body;
    // const accessToken = event["Authorization"];

    if (!accessToken)
      throw new CustomError("No authorization Token was found ", 400);

    console.log(password);
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
 * Sign Up User To Cognito DB
 */
export async function signInUser(event?: any, context?: Context) {
  context.callbackWaitsForEmptyEventLoop = false;
  const { email, password } = event.body;
  console.log(email, password);
  try {
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
 * Private- For Testing Only - add user to a group with different access control
 */
export async function addUserToGroup(event?: any, context?: Context) {
  context.callbackWaitsForEmptyEventLoop = false;
  const { email, groupName } = event.body;
  console.log(email, groupName);
  try {
    const data = await CognitoService.addUserToGroupCognitoHandler({
      groupName,
      email,
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
  addUserToGroup,
  setUsersInitialPassword,
  resendConfirmationCode,
};
