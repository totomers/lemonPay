import {
  APIGatewayProxyEvent,
  CreateAuthChallengeTriggerEvent,
  DefineAuthChallengeTriggerEvent,
  VerifyAuthChallengeResponseTriggerEvent,
} from "aws-lambda";
import AWS from "aws-sdk";
import { CONFIG } from "src/config";
import { AWSCognitoError } from "src/utils/customError";
import { EmailService } from "./email.service";
console.log(CONFIG.SERVERLESS.REGION);

AWS.config.update({ region: CONFIG.SERVERLESS.REGION });
const userPoolId = CONFIG.COGNITO.USER_POOL_ID;
const clientId = CONFIG.COGNITO.CLIENT_ID;

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
  apiVersion: "2016-04-18",
});

/**
 * Create new user
 * @param params
 */

export async function signUpCognitoHandler(params: {
  name: string;
  email: string;
}): Promise<AWS.CognitoIdentityServiceProvider.SignUpResponse | AWS.AWSError> {
  try {
    const { email, name } = params;

    await overrideUninitiatedUser({ email });

    const signUpRequest: AWS.CognitoIdentityServiceProvider.SignUpRequest = {
      Username: email,
      Password: process.env.COGNITO_USER_DUMMY_PASSWORD,
      ClientId: clientId,
      UserAttributes: [
        {
          Name: "name",
          Value: name,
        },
        {
          Name: "email",
          Value: email,
        },
        {
          Name: "custom:isInitiated",
          Value: "0",
        },
        {
          Name: "custom:isKnownDetails",
          Value: "0",
        },
        {
          Name: "custom:isVerified",
          Value: "0",
        },
      ],
    };
    const result = await cognitoidentityserviceprovider
      .signUp(signUpRequest)
      .promise();

    return result;
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}

/**
 * Delete user if he has not changed his dummy password and attempts to sign up with the same email
 * @param params
 * @returns null
 */

export async function overrideUninitiatedUser(params: { email: string }) {
  try {
    const { email } = params;

    const user = await _getUserFromCognito(email);

    if (!user || !user.UserAttributes) return;
    console.log("found an exisiting user", user);

    const isUninitiatedAttr = _getCustomAttribute(
      user.UserAttributes,
      "custom:isInitiated"
    );

    if (isUninitiatedAttr.Value === "0") {
      const adminDeleteUserRequest: AWS.CognitoIdentityServiceProvider.AdminDeleteUserRequest =
        { UserPoolId: userPoolId, Username: email };
      await cognitoidentityserviceprovider
        .adminDeleteUser(adminDeleteUserRequest)
        .promise();
    }
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}

/**
 * Delete user if he has not changed his dummy password and attempts to sign up with the same email
 * @param params
 * @returns null
 */

export async function getUserStatusHandler(params: { email: string }) {
  try {
    const { email } = params;
    const user = await _getUserFromCognito(email);

    if (!user || !user.UserAttributes) return;
    console.log("found an exisiting user", user);

    const isUninitiatedAttr = _getCustomAttribute(
      user.UserAttributes,
      "custom:isInitiated"
    );
    const isKnownDetails = _getCustomAttribute(
      user.UserAttributes,
      "custom:isKnownDetails"
    );
    const isVerified = _getCustomAttribute(
      user.UserAttributes,
      "custom:isVerified"
    );

    return {
      isInitiated: isUninitiatedAttr.Value === "1",
      isKnownDetails: isKnownDetails.Value === "1",
      isVerified: isVerified.Value === "1",
    };
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}

async function _getUserFromCognito(
  email: string
): Promise<AWS.CognitoIdentityServiceProvider.AdminGetUserResponse> {
  try {
    const getUserRequest: AWS.CognitoIdentityServiceProvider.AdminGetUserRequest =
      {
        Username: email,
        UserPoolId: userPoolId,
      };
    const user = await cognitoidentityserviceprovider
      .adminGetUser(getUserRequest)
      .promise();
    return user;
  } catch (error) {
    return error;
  }
}

/**
 *
 * @param userAttributes
 * @param customAttribute
 * @returns AWS User Attribute
 */

function _getCustomAttribute(
  userAttributes: AWS.CognitoIdentityServiceProvider.AttributeListType,
  customAttribute: string
) {
  return userAttributes.find((attr) => attr.Name === customAttribute);
}

/**
 * Update Cognito Users Attribute
 * @param params
 */

export async function updateUserAttribute(params: {
  name: string;
  value: string;
  email: string;
}): Promise<
  | AWS.CognitoIdentityServiceProvider.AdminUpdateUserAttributesResponse
  | AWS.AWSError
> {
  try {
    const { name, value, email } = params;

    const updateUserAttributeRequest: AWS.CognitoIdentityServiceProvider.AdminUpdateUserAttributesRequest =
      {
        Username: email,
        UserPoolId: userPoolId,
        UserAttributes: [
          {
            Name: name,
            Value: value,
          },
        ],
      };
    const result = await cognitoidentityserviceprovider
      .adminUpdateUserAttributes(updateUserAttributeRequest)
      .promise();

    return result;
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}

/**
 * Resend OTP to users email for confirmation
 * @param params
 */

export async function resendConfirmationCodeHandler(params: {
  email: string;
}): Promise<AWS.CognitoIdentityServiceProvider.ConfirmSignUpResponse> {
  try {
    const { email } = params;

    const resendConfirmationCodeRequest: AWS.CognitoIdentityServiceProvider.ResendConfirmationCodeRequest =
      {
        Username: email,
        ClientId: clientId,
      };
    const result = await cognitoidentityserviceprovider
      .resendConfirmationCode(resendConfirmationCodeRequest)
      .promise();

    return result;
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}

/**
 *  Initiates password reset process. Sends confirmation email to user to get permission to reset users password
 * @param params
 */

export async function resetUserPasswordHandler(params: {
  email: string;
}): Promise<AWS.CognitoIdentityServiceProvider.ForgotPasswordResponse> {
  try {
    const { email } = params;
    const ForgotPasswordRequest: AWS.CognitoIdentityServiceProvider.ForgotPasswordRequest =
      {
        Username: email,
        ClientId: clientId,
      };
    const result = await cognitoidentityserviceprovider
      .forgotPassword(ForgotPasswordRequest)
      .promise();

    return result;
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}

/**
 *  Initiates password reset process. Sends confirmation email to user to get permission to reset users password
 * @param params
 */

export async function confirmUserPasswordResetHandler(params: {
  email: string;
  password: string;
  confirmationCode: string;
}): Promise<AWS.CognitoIdentityServiceProvider.ConfirmForgotPasswordResponse> {
  try {
    const { email, password, confirmationCode } = params;
    const ConfirmForgotPasswordRequest: AWS.CognitoIdentityServiceProvider.ConfirmForgotPasswordRequest =
      {
        Username: email,
        ClientId: clientId,
        Password: password,
        ConfirmationCode: confirmationCode,
      };
    const result = await cognitoidentityserviceprovider
      .confirmForgotPassword(ConfirmForgotPasswordRequest)
      .promise();

    return result;
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}

/**
 * Confirm new users email
 * @param params
 */

export async function confirmSignUpCognitoHandler(params: {
  email: string;
  confirmationCode: string;
}): Promise<AWS.CognitoIdentityServiceProvider.ConfirmSignUpResponse> {
  try {
    const { email, confirmationCode } = params;

    const confirmSignUpRequest: AWS.CognitoIdentityServiceProvider.ConfirmSignUpRequest =
      {
        Username: email,
        ConfirmationCode: confirmationCode,
        ClientId: clientId,
      };
    const result = await cognitoidentityserviceprovider
      .confirmSignUp(confirmSignUpRequest)
      .promise();

    //validate if confirmation was successful, if so then add the user to the unverified group (limited access)
    await addUserToGroupCognitoHandler({ groupName: "unverified", email });

    return result;
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}

export async function setInitialUserPasswordHandler(params: {
  email;
  accessToken: string;
  password: string;
}): Promise<
  AWS.CognitoIdentityServiceProvider.ChangePasswordResponse | AWS.AWSError
> {
  try {
    const { email, accessToken, password } = params;

    console.log("old password", process.env.COGNITO_USER_DUMMY_PASSWORD);

    const changePasswordRequest: AWS.CognitoIdentityServiceProvider.ChangePasswordRequest =
      {
        AccessToken: accessToken,
        PreviousPassword: process.env.COGNITO_USER_DUMMY_PASSWORD,
        ProposedPassword: password,
      };
    const result = await cognitoidentityserviceprovider
      .changePassword(changePasswordRequest)
      .promise();

    await updateUserAttribute({
      email,
      name: "custom:isInitiated",
      value: "1",
    });
    return result;
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}

/**
 * Sign in existing user
 * @param params
 */

export async function signInCognitoHandler(params: {
  email: string;
  password: string;
}): Promise<AWS.CognitoIdentityServiceProvider.InitiateAuthResponse> {
  try {
    const { email, password } = params;

    const result = await cognitoidentityserviceprovider
      .initiateAuth({
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: clientId,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      })
      .promise();

    return result;
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}

/**
 * Sign in existing user with refresh token
 * @param params
 */

export async function refreshTokenSignInCognitoHandler(params: {
  refreshToken: string;
}): Promise<AWS.CognitoIdentityServiceProvider.InitiateAuthResponse> {
  try {
    const { refreshToken } = params;

    const result = await cognitoidentityserviceprovider
      .initiateAuth({
        AuthFlow: "REFRESH_TOKEN_AUTH",
        ClientId: clientId,
        AuthParameters: {
          REFRESH_TOKEN: refreshToken,
        },
      })
      .promise();

    return result;
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}

/**
 *  Add User To Group With Unique Permissions
 * @param params
 */

export async function addUserToGroupCognitoHandler(params: {
  groupName: "verified" | "unverified";
  email: string;
}): Promise<{ addToGroup: boolean }> {
  try {
    const { email, groupName } = params;

    // const cognitoidentityserviceprovider =
    //   new AWS.CognitoIdentityServiceProvider();

    await cognitoidentityserviceprovider
      .adminAddUserToGroup({
        UserPoolId: userPoolId,
        GroupName: groupName,
        Username: email,
      })
      .promise();

    return { addToGroup: true };
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}

/**
 *  Add User To Group With Unique Permissions
 * @param params
 */

export async function getVerificationStatusHandler(params: {
  email: string;
}): Promise<{ status: "Verified" | "Pending" }> {
  try {
    //HERE WE WILL CHECK IF THE USER IS IN THE GROUP "VERIFIED" OR "UNVERIFIED" AD RETURN EITHER "PENDING" OR "CREATED"

    const { email } = params;
    const AdminListGroupsForUserRequest: AWS.CognitoIdentityServiceProvider.AdminListGroupsForUserRequest =
      { Username: email, UserPoolId: userPoolId };

    const userGroups = await cognitoidentityserviceprovider
      .adminListGroupsForUser(AdminListGroupsForUserRequest)
      .promise();

    console.log("user groups", userGroups.Groups);
    const isUserVerified = userGroups.Groups.find(
      (g) => g.GroupName === "verified"
    );

    return { status: isUserVerified ? "Verified" : "Pending" };
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}

/**
 *  Defining Auth Challange Handler To Send OTP For User Auth.
 * @param params
 */

export async function defineAuthChallengeHandler(params: {
  event: DefineAuthChallengeTriggerEvent;
}): Promise<DefineAuthChallengeTriggerEvent> {
  try {
    const { event } = params;
    console.log(event);

    // If user is not registered
    if (event.request.userNotFound) {
      event.response.issueTokens = false;
      event.response.failAuthentication = true;
      throw new Error("User does not exist");
    }

    if (
      event.request.session.length >= 3 &&
      event.request.session.slice(-1)[0].challengeResult === false
    ) {
      // wrong OTP even After 3 sessions?
      event.response.issueTokens = false;
      event.response.failAuthentication = true;
      throw new Error("Invalid OTP");
    } else if (
      event.request.session.length > 0 &&
      event.request.session.slice(-1)[0].challengeResult === true
    ) {
      // Correct OTP!
      event.response.issueTokens = true;
      event.response.failAuthentication = false;
    } else {
      // not yet received correct OTP
      event.response.issueTokens = false;
      event.response.failAuthentication = false;
      event.response.challengeName = "CUSTOM_CHALLENGE";
    }

    return event;
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}

/**
 *  Verify Auth Challange Handler To Send OTP For User Auth.
 * @param params
 */

export async function verifyAuthChallengeHandler(params: {
  event: VerifyAuthChallengeResponseTriggerEvent;
}): Promise<VerifyAuthChallengeResponseTriggerEvent> {
  try {
    const { event } = params;
    console.log(event.request);

    const expectedAnswer =
      event.request.privateChallengeParameters.secretLoginCode;
    if (event.request.challengeAnswer === expectedAnswer) {
      event.response.answerCorrect = true;
    } else {
      event.response.answerCorrect = false;
    }

    return event;
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}

/**
 *  Creating Auth Challange Handler To Send OTP For User Auth.
 * @param params
 */

export async function createAuthChallengeHandler(params: {
  event: CreateAuthChallengeTriggerEvent;
}): Promise<CreateAuthChallengeTriggerEvent> {
  try {
    const { event } = params;
    let secretLoginCode;
    if (!event.request.session || !event.request.session.length) {
      // Generate a new secret login code and send it to the user
      secretLoginCode = Date.now().toString().slice(-4);
      console.log("OTP / Secret Password Reset Code: " + secretLoginCode);
      try {
        const html = `<html><body><p>This is your secret password reset code:</p>
        <h3>${secretLoginCode}</h3></body></html>`;
        const text = `Your secret password reset code: ${secretLoginCode}`;
        const subject = "Your secret password reset code";
        const to = event.request.userAttributes.email;

        const emailResult = EmailService.sendTextEmailHandler({
          text,
          subject,
          to,
          html,
        });

        console.log(emailResult);
        console.log("EMAIL DELIVERED");
      } catch (error) {
        // Handle SMS Failure
        console.log(error);
      }
    } else {
      // re-use code generated in previous challenge
      const previousChallenge = event.request.session.slice(-1)[0];
      secretLoginCode =
        previousChallenge.challengeMetadata.match(/CODE-(\d*)/)[1];
    }

    console.log(event.request.userAttributes);

    // Add the secret login code to the private challenge parameters
    // so it can be verified by the "Verify Auth Challenge Response" trigger
    event.response.privateChallengeParameters = { secretLoginCode };

    // Add the secret login code to the session so it is available
    // in a next invocation of the "Create Auth Challenge" trigger
    event.response.challengeMetadata = `CODE-${secretLoginCode}`;

    return event;
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}

export const CognitoService = {
  signUpCognitoHandler,
  resendConfirmationCodeHandler,
  confirmSignUpCognitoHandler,
  signInCognitoHandler,
  refreshTokenSignInCognitoHandler,
  addUserToGroupCognitoHandler,
  setInitialUserPasswordHandler,
  getVerificationStatusHandler,
  resetUserPasswordHandler,
  confirmUserPasswordResetHandler,
  updateUserAttribute,
  getUserStatusHandler,
  defineAuthChallengeHandler,
  createAuthChallengeHandler,
  verifyAuthChallengeHandler,
};
