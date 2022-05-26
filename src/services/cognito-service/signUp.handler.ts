import { AWSCognitoError } from 'src/utils/customError';
import {
  AWS,
  clientId,
  cognitoidentityserviceprovider,
  userPoolId,
} from './common';
import { _getCustomAttribute } from './utils/_getCustomAttr';
import { _getUserFromCognito } from './utils/_getUserFromCognito';

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
