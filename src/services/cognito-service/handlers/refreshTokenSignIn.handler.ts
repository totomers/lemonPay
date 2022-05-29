import { AWSCognitoError } from 'src/utils/customError';
import { clientId, cognitoidentityserviceprovider } from '../common';

/**
 * =======================================================================================================
 * Sign in existing user with refresh token
 * @param params
 * =======================================================================================================
 */

export async function refreshTokenSignInCognitoHandler(params: {
  refreshToken: string;
}): Promise<{
  idToken: string;
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

    return { idToken: cognitoAuthResults.AuthenticationResult.IdToken };
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}
