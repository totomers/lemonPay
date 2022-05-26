import { RevokeTokenRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { AWSCognitoError } from 'src/utils/customError';
import { clientId, cognitoidentityserviceprovider } from '../common';
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
