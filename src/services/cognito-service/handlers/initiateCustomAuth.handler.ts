import { InitiateAuthRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { AWSCognitoError } from 'src/utils/customError';
import { clientId, cognitoidentityserviceprovider } from '../common';
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
