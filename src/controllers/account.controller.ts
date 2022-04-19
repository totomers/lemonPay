import { Context } from "aws-lambda";
import { MessageUtil } from "../utils/message";
import { AccountService } from "../services/account.service";
import { CognitoService } from "src/services/cognito.service";

/**
 * Create Business Account
 */
export async function createBusinessAccount(event?: any, context?: Context) {
  context.callbackWaitsForEmptyEventLoop = false;

  //extract business and user details from event
  const user = event.body.user;
  const business = event.body.business;
  try {
    const result = await AccountService.createBusinessAccountHandler({
      user,
      business,
    });
    return result;
  } catch (err) {
    console.error(err);
    console.log("error:", err);
    return MessageUtil.error(err.code, err.message);
  }
}

/**
 * Verify User Details
 */
export async function verifyUserDetails(event?: any, context?: Context) {
  context.callbackWaitsForEmptyEventLoop = false;

  //extract business and user details from event
  const user = event.body.user;
  const userPoolId = event.body.userPoolId;
  const userName = event.body.userName;

  console.log(user, userPoolId, userName);

  try {
    const result = await AccountService.verifyUserDetailsHandler({
      user,
      userPoolId,
      userName,
    });
    return result;
  } catch (err) {
    console.error(err);
    console.log("error:", err);
    return MessageUtil.error(err.code, err.message);
  }
}

/**
 * Sign Up User To Cognito DB
 */
export async function signUpUser(event?: any, context?: Context) {
  context.callbackWaitsForEmptyEventLoop = false;
  const { name, email, password } = event.body;
  console.log(password, email, name);
  try {
    const result = await CognitoService.signUpCognitoHandler({
      name,
      email,
      password,
    });
    return result;
  } catch (err) {
    return err;
  }
}

/**
 * Sign Up User To Cognito DB
 */
export async function confirmSignUpUser(event?: any, context?: Context) {
  context.callbackWaitsForEmptyEventLoop = false;
  const { email, confirmationCode } = event.body;
  console.log(email, confirmationCode);
  try {
    const result = await CognitoService.confirmSignUpCognitoHandler({
      confirmationCode,
      email,
    });
    return result;
  } catch (err) {
    return err;
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
    const result = await CognitoService.signInCognitoHandler({
      password,
      email,
    });
    return result;
  } catch (err) {
    return err;
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
    const result = await CognitoService.addUserToGroupCognitoHandler({
      groupName,
      email,
    });
    return result;
  } catch (err) {
    return err;
  }
}
export const AccountController = {
  createBusinessAccount,
  verifyUserDetails,
  signUpUser,
  confirmSignUpUser,
  signInUser,
  addUserToGroup,
};
