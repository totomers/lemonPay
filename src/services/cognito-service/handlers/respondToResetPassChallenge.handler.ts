import { RespondToAuthChallengeRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { AWSCognitoError } from 'src/utils/customError';
import { CognitoService } from '..';
import {
  clientId,
  cognitoidentityserviceprovider,
  CustomError,
} from '../common';

/**
 * =======================================================================================================
 *  Respond to custom auth challenge sign in with OTP.
 * @param params
 * =======================================================================================================
 */
export async function respondToResetPassChallengeHandler(params: {
  confirmationCode: string;
  session: string;
  username: string;
}): Promise<{ accessToken: string } | { session: string }> {
  try {
    const { confirmationCode, session, username } = params;

    const RespondToAuthChallengeRequest: RespondToAuthChallengeRequest = {
      ChallengeName: 'CUSTOM_CHALLENGE',
      ClientId: clientId,
      ChallengeResponses: { ANSWER: confirmationCode, USERNAME: username },
      Session: session,
    };

    const data = await cognitoidentityserviceprovider
      .respondToAuthChallenge(RespondToAuthChallengeRequest)
      .promise();

    if (!data?.AuthenticationResult) {
      // throw new CustomError(
      //   'Confirmation Code is incorrect.',
      //   500,
      //   'CodeMismatchException',
      //   'A'
      // );
      return { session: data.Session };
    }

    await CognitoService.updateUserAttributes({
      attributes: [{ Name: 'custom:isPasswordMutable', Value: '1' }],
      email: username,
    });
    return { accessToken: data.AuthenticationResult.AccessToken };
  } catch (err) {
    if (err.code === 'NotAuthorizedException')
      throw new CustomError(
        'Confirmation Code is invalid.',
        400,
        'TooManyRequestsException'
      );
    throw new AWSCognitoError(err);
  }
}
