import { AWSCognitoError } from 'src/utils/customError';
import { CognitoService } from '..';
import { clientId, cognitoidentityserviceprovider } from '../common';

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

    await cognitoidentityserviceprovider
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
