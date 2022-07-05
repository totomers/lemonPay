import { AdminOnlyError, AWSCognitoError } from 'src/utils/Errors';
import { CognitoService } from '..';
import { clientId, cognitoidentityserviceprovider } from '../common';

/**
 * =======================================================================================================
 * Sign in existing user
 * @param params
 * =======================================================================================================
 */

export async function signInLemonPayAdminHandler(params: {
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

    await _checkIfLemonPayAdmin({ email });

    const data = await CognitoService.initiateCustomAuthHandler({
      email,
      currentAuthChallenge: 'LOGIN',
    });

    return { session: data.session };
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}

async function _checkIfLemonPayAdmin(props: { email: string }) {
  const { email } = props;
  const userStatus = await CognitoService.getUserStatusHandler({ email });
  if (!userStatus.isLemonPayAdmin) throw new AdminOnlyError();
  return;
}
