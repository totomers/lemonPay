import { AWSCognitoError } from 'src/utils/Errors';
import { CognitoService } from '..';
import { clientId, cognitoidentityserviceprovider } from '../common';

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
