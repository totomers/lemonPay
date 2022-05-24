import {
  APIGatewayProxyEvent,
  CreateAuthChallengeTriggerEvent,
  DefineAuthChallengeTriggerEvent,
  VerifyAuthChallengeResponseTriggerEvent,
} from 'aws-lambda';
import AWS from 'aws-sdk';
import {
  InitiateAuthRequest,
  InitiateAuthResponse,
  RespondToAuthChallengeRequest,
  RespondToAuthChallengeResponse,
  RevokeTokenRequest,
} from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { CONFIG } from 'src/config';
import { IUserDocument } from 'src/types/user.interface';
import { AWSCognitoError, CustomError } from 'src/utils/customError';
import { AccountService } from './account.service';
import { EmailService } from './email.service';
import jwt_decode from 'jwt-decode';
import { IClaimsIdToken } from 'src/types/claimsIdToken.interface';
import { isAlphaNumericalWithSpecialChar } from 'src/utils/validators/validate-password';

AWS.config.update({ region: CONFIG.SERVERLESS.REGION });
const userPoolId = CONFIG.COGNITO.USER_POOL_ID;
const clientId = CONFIG.COGNITO.CLIENT_ID;

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
  apiVersion: '2016-04-18',
});

/**
 * =======================================================================================================
 * Create new user
 * @param params
 * =======================================================================================================
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
          Name: 'name',
          Value: name,
        },
        {
          Name: 'email',
          Value: email,
        },
        {
          Name: 'custom:isInitiated',
          Value: '0',
        },
        {
          Name: 'custom:isKnownDetails',
          Value: '0',
        },
        {
          Name: 'custom:isVerified',
          Value: '0',
        },
        {
          Name: 'custom:isPasswordMutable',
          Value: '0',
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
 * =======================================================================================================
 * Delete user if he has not changed his dummy password and attempts to sign up with the same email
 * @param params
 * @returns null
 * =======================================================================================================
 */

export async function overrideUninitiatedUser(params: { email: string }) {
  try {
    const { email } = params;

    const result = await _getUserFromCognito(email);
    if (result instanceof AWSCognitoError) return result;

    const user = result;
    // if (!user || !user.UserAttributes) return;
    console.log('found an exisiting user', user);

    const isUninitiatedAttr = _getCustomAttribute(
      user.UserAttributes,
      'custom:isInitiated'
    );

    if (isUninitiatedAttr.Value === '0') {
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
 * =======================================================================================================
 * Delete user if he has not changed his dummy password and attempts to sign up with the same email
 * @param params
 * @returns null
 * =======================================================================================================
 */

export async function getUserStatusHandler(params: { email: string }) {
  try {
    const { email } = params;
    const result = await _getUserFromCognito(email);

    if (result instanceof AWSCognitoError) throw result;
    const user = result;
    if (!user || !user.UserAttributes) return;
    console.log('found an exisiting user', user);

    const isUninitiatedAttr = _getCustomAttribute(
      user.UserAttributes,
      'custom:isInitiated'
    );
    const isKnownDetails = _getCustomAttribute(
      user.UserAttributes,
      'custom:isKnownDetails'
    );
    const isVerified = _getCustomAttribute(
      user.UserAttributes,
      'custom:isVerified'
    );

    return {
      isInitiated: isUninitiatedAttr.Value === '1',
      isKnownDetails: isKnownDetails.Value === '1',
      isVerified: isVerified.Value === '1',
    };
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}

/**
 * =======================================================================================================
 * Gets User From Cognito
 * @param email
 * =======================================================================================================
 */

async function _getUserFromCognito(
  email: string
): Promise<
  AWS.CognitoIdentityServiceProvider.AdminGetUserResponse | AWSCognitoError
> {
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
    return new AWSCognitoError(error);
  }
}

/**
 *=======================================================================================================
 * @param userAttributes
 * @param customAttribute
 * @returns AWS User Attribute
 * =======================================================================================================
 */

function _getCustomAttribute(
  userAttributes: AWS.CognitoIdentityServiceProvider.AttributeListType,
  customAttribute: string
) {
  return userAttributes.find((attr) => attr.Name === customAttribute);
}

/**
 * =======================================================================================================
 * Update Cognito Users Attribute
 * @param params
 * =======================================================================================================
 */

export async function updateUserAttributes(params: {
  attributes: AWS.CognitoIdentityServiceProvider.AttributeListType;
  email: string;
}): Promise<
  | AWS.CognitoIdentityServiceProvider.AdminUpdateUserAttributesResponse
  | AWS.AWSError
> {
  try {
    const { attributes, email } = params;

    const updateUserAttributeRequest: AWS.CognitoIdentityServiceProvider.AdminUpdateUserAttributesRequest =
      {
        Username: email,
        UserPoolId: userPoolId,
        UserAttributes: attributes,
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
 * =======================================================================================================
 * Resend OTP to users email for confirmation
 * @param params
 * =======================================================================================================
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
 * =======================================================================================================
 *  Initiates password reset process. Sends confirmation email to user to get permission to reset users password
 * @param params
 * =======================================================================================================
 */

export async function resetUserPasswordHandler(params: {
  password: string;
  accessToken: string;
}): Promise<{
  tokens: {
    idToken: string;
    refreshToken: string;
  };
  user: Partial<IUserDocument>;
}> {
  try {
    const { accessToken, password } = params;

    if (!isAlphaNumericalWithSpecialChar(password))
      throw new CustomError(
        'Password must consist of alphanumerical or special characters only.',
        400,
        'IllegalPassword'
      );

    const GetUserRequest: AWS.CognitoIdentityServiceProvider.GetUserRequest = {
      AccessToken: accessToken,
    };

    const user = await cognitoidentityserviceprovider
      .getUser(GetUserRequest)
      .promise();

    if (
      _getCustomAttribute(user.UserAttributes, 'custom:isPasswordMutable')
        .Value === '0'
    ) {
      throw new CustomError(
        'Password is currently not mutable for this user',
        400,
        'PasswordNotMutable'
      );
    }
    const email = user.Username;

    const AdminSetUserPasswordRequest: AWS.CognitoIdentityServiceProvider.AdminSetUserPasswordRequest =
      {
        UserPoolId: userPoolId,
        Permanent: true,
        Password: password,
        Username: email,
      };
    await cognitoidentityserviceprovider
      .adminSetUserPassword(AdminSetUserPasswordRequest)
      .promise();

    await updateUserAttributes({
      attributes: [{ Name: 'custom:isPasswordMutable', Value: '0' }],
      email,
    });

    const SignInRequest: InitiateAuthRequest = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: clientId,
      AuthParameters: { USERNAME: email, PASSWORD: password },
    };

    const data = await cognitoidentityserviceprovider
      .initiateAuth(SignInRequest)
      .promise();

    const result = await _extractCustomResultFromAuthChallenge({
      authChallengeResult: data,
    });

    return result;
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}

/**
 * =======================================================================================================
 *  Initiates password reset process. Sends confirmation email to user to get permission to reset users password
 * @param params
 * =======================================================================================================
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
 * =======================================================================================================
 * Confirm new users email & return him his tokens
 * @param params
 * =======================================================================================================
 */

export async function confirmSignUpCognitoHandler(params: {
  email: string;
  confirmationCode: string;
}): Promise<{ idToken: string; accessToken: string }> {
  try {
    const { email, confirmationCode } = params;

    await CognitoService.confirmEmailCognitoHandler({
      email,
      confirmationCode,
    });

    const { AuthenticationResult } = await cognitoidentityserviceprovider
      .initiateAuth({
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: clientId,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: process.env.COGNITO_USER_DUMMY_PASSWORD,
        },
      })
      .promise();

    const { IdToken, RefreshToken, AccessToken } = AuthenticationResult;
    const tokens = {
      idToken: IdToken,
      accessToken: AccessToken,
      refreshToken: RefreshToken,
    };
    return tokens;
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}

export async function confirmEmailCognitoHandler(params: {
  email: string;
  confirmationCode: string;
}): Promise<{}> {
  try {
    const { email, confirmationCode } = params;
    console.log('process.env.STAGE:', process.env.STAGE);

    if (
      process.env.STAGE === 'DEV' &&
      confirmationCode === process.env.FAKE_CONFIRMATION_CODE_DEV_TESTING
    ) {
      const adminConfirmSignUpRequest: AWS.CognitoIdentityServiceProvider.AdminConfirmSignUpRequest =
        {
          Username: email,
          UserPoolId: userPoolId,
        };
      await cognitoidentityserviceprovider
        .adminConfirmSignUp(adminConfirmSignUpRequest)
        .promise();
    } else {
      const confirmSignUpRequest: AWS.CognitoIdentityServiceProvider.ConfirmSignUpRequest =
        {
          Username: email,
          ConfirmationCode: confirmationCode,
          ClientId: clientId,
        };
      await cognitoidentityserviceprovider
        .confirmSignUp(confirmSignUpRequest)
        .promise();
    }

    return {};
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

    if (!isAlphaNumericalWithSpecialChar(password))
      throw new CustomError(
        'Password must consist of alphanumerical or special characters only.',
        400,
        'IllegalPassword'
      );

    const changePasswordRequest: AWS.CognitoIdentityServiceProvider.ChangePasswordRequest =
      {
        AccessToken: accessToken,
        PreviousPassword: process.env.COGNITO_USER_DUMMY_PASSWORD,
        ProposedPassword: password,
      };
    const result = await cognitoidentityserviceprovider
      .changePassword(changePasswordRequest)
      .promise();

    await updateUserAttributes({
      email,
      attributes: [{ Name: 'custom:isInitiated', Value: '1' }],
    });

    return result;
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}

/**
 * =======================================================================================================
 * Sign in existing user
 * @param params
 * =======================================================================================================
 */

export async function signInCognitoHandler(params: {
  email: string;
  password: string;
}): Promise<{
  session: string;
}> {
  try {
    const { email, password } = params;

    const cognitoAuthResults = await cognitoidentityserviceprovider
      .initiateAuth({
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: clientId,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      })
      .promise();

    const data = await CognitoService.initiateCustomAuthHandler({ email });

    return { session: data.session };
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}

/**
 * =======================================================================================================
 * Logout out user
 * @param params
 * =======================================================================================================
 */

export async function logoutUserHandler(params: {
  refreshToken: string;
}): Promise<AWS.CognitoIdentityServiceProvider.RevokeTokenResponse> {
  try {
    const { refreshToken } = params;

    const revokeTokenRequest: RevokeTokenRequest = {
      Token: refreshToken,
      ClientId: clientId,
    };
    await cognitoidentityserviceprovider
      .revokeToken(revokeTokenRequest)
      .promise();

    return {};
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}

/**
 * =======================================================================================================
 * Sign in existing user with refresh token
 * @param params
 * =======================================================================================================
 */

export async function refreshTokenSignInCognitoHandler(params: {
  refreshToken: string;
}): Promise<{
  tokens: { idToken: string };
  user: Partial<IUserDocument>;
}> {
  try {
    const { refreshToken } = params;

    const cognitoAuthResults = await cognitoidentityserviceprovider
      .initiateAuth({
        AuthFlow: 'REFRESH_TOKEN_AUTH',
        ClientId: clientId,
        AuthParameters: {
          REFRESH_TOKEN: refreshToken,
        },
      })
      .promise();

    const { IdToken } = cognitoAuthResults.AuthenticationResult;
    const tokens = { idToken: IdToken };

    // const email = (jwt_decode(tokens.idToken) as { email: string }).email;

    // const user = await AccountService.getUserHandler({ email });
    // const { _id, name, businesses } = user;

    const decodedToken = jwt_decode(IdToken) as IClaimsIdToken;
    const email = decodedToken.email;
    const isKnownDetails = parseInt(decodedToken['custom:isKnownDetails']);

    const emptyUser = { _id: '', name: '', businesses: [], email: '' };

    if (isKnownDetails > 0) {
      const user = await AccountService.getUserHandler({ email });
      if (!user) {
        await updateUserAttributes({
          attributes: [{ Name: 'custom:isKnownDetails', Value: '0' }],
          email,
        });
        return { tokens, user: emptyUser };
      }
      const { _id, name, businesses } = user;
      return { tokens, user: { _id, name, businesses, email } };
    } else
      return {
        tokens,
        user: emptyUser,
      };
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}

/***
 * =======================================================================================================
 *  Add User To Group With Unique Permissions
 * @param params
 * =======================================================================================================
 */

export async function addUserToGroupCognitoHandler(params: {
  groupName: 'verified' | 'unverified';
  email: string;
}): Promise<{ addToGroup: boolean }> {
  try {
    const { email, groupName } = params;

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
 * =======================================================================================================
 *  Add User To Group With Unique Permissions
 * @param params
 * =======================================================================================================
 */

export async function getVerificationStatusHandler(params: {
  email: string;
}): Promise<{ status: 'Verified' | 'Pending' }> {
  try {
    //HERE WE WILL CHECK IF THE USER IS IN THE GROUP "VERIFIED" OR "UNVERIFIED" AD RETURN EITHER "PENDING" OR "CREATED"

    const { email } = params;
    const AdminListGroupsForUserRequest: AWS.CognitoIdentityServiceProvider.AdminListGroupsForUserRequest =
      { Username: email, UserPoolId: userPoolId };

    const userGroups = await cognitoidentityserviceprovider
      .adminListGroupsForUser(AdminListGroupsForUserRequest)
      .promise();

    console.log('user groups', userGroups.Groups);
    const isUserVerified = userGroups.Groups.find(
      (g) => g.GroupName === 'verified'
    );

    return { status: isUserVerified ? 'Verified' : 'Pending' };
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}

/**
 * =======================================================================================================
 *  Defining Auth Challange Handler To Send OTP For User Auth.
 * @param params
 * =======================================================================================================
 */

export async function defineAuthChallengeHandler(params: {
  event: DefineAuthChallengeTriggerEvent;
}): Promise<DefineAuthChallengeTriggerEvent> {
  try {
    const { event } = params;
    console.log('event sessions: ', event.request.session);
    console.log('event sessions amount: ', event.request.session.length);

    // If user is not registered
    if (event.request.userNotFound) {
      event.response.issueTokens = false;
      event.response.failAuthentication = true;
      throw new Error('User does not exist');
    }

    if (
      event.request.session.length > 3 &&
      event.request.session.slice(-1)[0].challengeResult === false
    ) {
      // wrong OTP even After 3 sessions?
      event.response.issueTokens = false;
      event.response.failAuthentication = true;
      throw new Error('Invalid OTP');
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
      event.response.challengeName = 'CUSTOM_CHALLENGE';
      console.log('Token was not yet correct, Continue challenging the user.');

      // throw new CustomError(
      //   'Confirmation Code is not correct',
      //   400,
      //   'CodeMismatchException',
      //   'A'
      // );
    }

    return event;
  } catch (err) {
    throw err;
  }
}

/**
 * =======================================================================================================
 *  Verify Auth Challange Handler To Send OTP For User Auth.
 * @param params
 * =======================================================================================================
 */

export async function verifyAuthChallengeHandler(params: {
  event: VerifyAuthChallengeResponseTriggerEvent;
}): Promise<VerifyAuthChallengeResponseTriggerEvent> {
  try {
    const { event } = params;

    const expectedAnswer =
      event.request.privateChallengeParameters.secretLoginCode;

    if (
      event.request.challengeAnswer === expectedAnswer ||
      (process.env.STAGE === 'DEV' &&
        event.request.challengeAnswer ===
          process.env.FAKE_CONFIRMATION_CODE_DEV_TESTING)
    ) {
      event.response.answerCorrect = true;
    } else {
      event.response.answerCorrect = false;
    }

    return event;
  } catch (err) {
    console.log('Error verifying the code: ', err);

    throw err;
  }
}

/**
 * =======================================================================================================
 *  Creating Auth Challange Handler To Send OTP For User Auth.
 * @param params
 * =======================================================================================================
 */

export async function createAuthChallengeHandler(params: {
  event: CreateAuthChallengeTriggerEvent;
}): Promise<CreateAuthChallengeTriggerEvent> {
  try {
    const { event } = params;
    let secretLoginCode;
    console.log('session:', event.request.session);
    console.log(event);

    if (!event.request.session || !event.request.session.length) {
      // Generate a new secret login code and send it to the user
      secretLoginCode = Date.now().toString().slice(-6);
      console.log('OTP / Secret Password Reset Code: ' + secretLoginCode);
      try {
        const html = `<html><body><p>This is your secret password reset code:</p>
        <h3>${secretLoginCode}</h3></body></html>`;
        const text = `Your secret password reset code: ${secretLoginCode}`;
        const subject = 'Your secret password reset code';
        const to = event.request.userAttributes.email;

        const emailResult = await EmailService.sendTextEmailHandler({
          text,
          subject,
          to,
          html,
        });

        console.log(emailResult);
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
    console.log('Error creating the auth: ', err);
    throw err;
  }
}

/**
 * =======================================================================================================
 *  Initiate sign in with OTP.
 * @param params
 * =======================================================================================================
 */

export async function initiateCustomAuthHandler(params: {
  email: string;
}): Promise<{ session: string }> {
  try {
    const { email } = params;

    const InitiateCustomAuthRequest: InitiateAuthRequest = {
      AuthFlow: 'CUSTOM_AUTH',
      ClientId: clientId,
      AuthParameters: { USERNAME: email },
    };

    const data = await cognitoidentityserviceprovider
      .initiateAuth(InitiateCustomAuthRequest)
      .promise();

    return { session: data.Session };
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}

/**
 * =======================================================================================================
 *  Respond to custom sign in auth challenge with OTP.
 * @param params
 * =======================================================================================================
 */

export async function respondToSignInChallengeHandler(params: {
  confirmationCode: string;
  session: string;
  username: string;
}): Promise<
  | {
      tokens: { idToken: string; refreshToken: string };
      user: Partial<IUserDocument>;
    }
  | { session: string }
> {
  try {
    const { confirmationCode, session, username } = params;

    const RespondToAuthChallengeRequest: RespondToAuthChallengeRequest = {
      ChallengeName: 'CUSTOM_CHALLENGE',
      ClientId: clientId,
      ChallengeResponses: { ANSWER: confirmationCode, USERNAME: username },
      Session: session,
    };

    const data = await cognitoidentityserviceprovider
      .respondToAuthChallenge(RespondToAuthChallengeRequest)
      .promise();

    console.log(
      'session gotten vs session returned:',
      session === data.Session
    );
    console.log('returned session ', data.Session);

    if (!data?.AuthenticationResult) {
      // throw new CustomError(
      //   'Confirmation Code is incorrect.',
      //   500,
      //   'CodeMismatchException',
      //   'A'
      // );
      return { session: data.Session };
    }

    const result = await _extractCustomResultFromAuthChallenge({
      authChallengeResult: data,
    });

    return result;
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}
/**
 * =======================================================================================================
 *  Extract user info and tokens from the cognito sign in response
 * @param params
 * =======================================================================================================
 */

export async function _extractCustomResultFromAuthChallenge(params: {
  authChallengeResult: AWS.CognitoIdentityServiceProvider.InitiateAuthResponse;
}): Promise<{
  tokens: { idToken: string; refreshToken: string };
  user: Partial<IUserDocument>;
}> {
  try {
    const { authChallengeResult } = params;

    const { IdToken, RefreshToken } = authChallengeResult.AuthenticationResult;
    const tokens = { idToken: IdToken, refreshToken: RefreshToken };

    const decodedToken = jwt_decode(IdToken) as IClaimsIdToken;
    const isKnownDetails = parseInt(decodedToken['custom:isKnownDetails']);
    const email = decodedToken.email;

    const emptyUser = { _id: '', name: '', businesses: [], email: '' };

    if (isKnownDetails > 0) {
      const user = await AccountService.getUserHandler({ email });
      if (!user) {
        await updateUserAttributes({
          attributes: [{ Name: 'custom:isKnownDetails', Value: '0' }],
          email,
        });
        return { tokens, user: emptyUser };
      }
      const { _id, name, businesses } = user;
      return { tokens, user: { _id, name, businesses, email } };
    } else
      return {
        tokens,
        user: emptyUser,
      };
  } catch (err) {
    throw err;
  }
}

/**
 * =======================================================================================================
 *  Respond to custom auth challenge sign in with OTP.
 * @param params
 * =======================================================================================================
 */

export async function respondToResetPassChallengeHandler(params: {
  confirmationCode: string;
  session: string;
  username: string;
}): Promise<{ accessToken: string } | { session: string }> {
  try {
    const { confirmationCode, session, username } = params;

    const RespondToAuthChallengeRequest: RespondToAuthChallengeRequest = {
      ChallengeName: 'CUSTOM_CHALLENGE',
      ClientId: clientId,
      ChallengeResponses: { ANSWER: confirmationCode, USERNAME: username },
      Session: session,
    };

    const data = await cognitoidentityserviceprovider
      .respondToAuthChallenge(RespondToAuthChallengeRequest)
      .promise();

    if (!data?.AuthenticationResult) {
      // throw new CustomError(
      //   'Confirmation Code is incorrect.',
      //   500,
      //   'CodeMismatchException',
      //   'A'
      // );
      return { session: data.Session };
    }
    await updateUserAttributes({
      attributes: [{ Name: 'custom:isPasswordMutable', Value: '1' }],
      email: username,
    });
    return { accessToken: data.AuthenticationResult.AccessToken };
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
  resetUserPasswordHandler,
  getVerificationStatusHandler,
  confirmUserPasswordResetHandler,
  updateUserAttributes,
  getUserStatusHandler,
  defineAuthChallengeHandler,
  createAuthChallengeHandler,
  verifyAuthChallengeHandler,
  initiateCustomAuthHandler,
  respondToResetPassChallengeHandler,
  respondToSignInChallengeHandler,
  logoutUserHandler,
  confirmEmailCognitoHandler,
};
