import { AWSCognitoError } from 'src/utils/customError';
import {
  AWS,
  clientId,
  cognitoidentityserviceprovider,
  userPoolId,
} from '../common';

/**
 * =======================================================================================================
 * Create new Lemon Pay Admin
 * @param params
 * =======================================================================================================
 */

export async function createLemonPayAdminHandler(params: {
  name: string;
  email: string;
  password: string;
}): Promise<
  AWS.CognitoIdentityServiceProvider.AdminCreateUserResponse | AWS.AWSError
> {
  try {
    const { email, name, password } = params;

    const createAdminUserRequest: AWS.CognitoIdentityServiceProvider.AdminCreateUserRequest =
      {
        Username: email,
        UserPoolId: userPoolId,
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
            Name: 'custom:isLemonPayAdmin',
            Value: '1',
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
      .adminCreateUser(createAdminUserRequest)
      .promise();

    const setUserPasswordRequest: AWS.CognitoIdentityServiceProvider.AdminSetUserPasswordRequest =
      {
        Password: password,
        Permanent: true,
        Username: email,
        UserPoolId: userPoolId,
      };

    await cognitoidentityserviceprovider
      .adminSetUserPassword(setUserPasswordRequest)
      .promise();

    // const ConfirmUserRequest: AWS.CognitoIdentityServiceProvider.AdminConfirmSignUpRequest =
    //   { UserPoolId: userPoolId, Username: email };

    // await cognitoidentityserviceprovider
    //   .adminConfirmSignUp(ConfirmUserRequest)
    //   .promise();

    return result;
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}
