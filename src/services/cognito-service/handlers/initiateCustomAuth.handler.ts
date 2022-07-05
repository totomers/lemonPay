import { InitiateAuthRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { IAuthChallenge } from 'src/types/authChallenge.interface';
import { AWSCognitoError } from 'src/utils/Errors';
import { CognitoService } from '..';
import { clientId, cognitoidentityserviceprovider } from '../common';
/**
 * =======================================================================================================
 *  Initiate sign in with OTP.
 * @param params
 * =======================================================================================================
 */

export async function initiateCustomAuthHandler(params: {
  email: string;
  currentAuthChallenge: IAuthChallenge;
}): Promise<{ session: string }> {
  try {
    const { email, currentAuthChallenge } = params;

    await CognitoService.updateUserAttributes({
      attributes: [
        {
          Name: 'custom:currentAuthChallenge',
          Value: currentAuthChallenge,
        },
      ],
      email,
    });

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
