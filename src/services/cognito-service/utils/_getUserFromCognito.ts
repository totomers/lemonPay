import { AWS, userPoolId, cognitoidentityserviceprovider } from '../common';

import { AWSCognitoError } from 'src/utils/customError';
/**
 * =======================================================================================================
 * Gets User From Cognito
 * @param email
 * =======================================================================================================
 */

export async function _getUserFromCognito(
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
