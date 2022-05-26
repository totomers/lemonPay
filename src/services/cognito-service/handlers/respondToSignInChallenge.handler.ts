import { RespondToAuthChallengeRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { IClaimsIdToken } from 'src/types/claimsIdToken.interface';
import { IUserDocument } from 'src/types/user.interface';
import { AWSCognitoError, CustomError } from 'src/utils/customError';
import { clientId, cognitoidentityserviceprovider } from '../common';
import jwt_decode from 'jwt-decode';
import { AccountService } from 'src/services/account.service';
import { CognitoService } from '..';
/**
 * =======================================================================================================
 *  Respond to custom sign in auth challenge with OTP.
 * @param params
 * =======================================================================================================
 */

export async function respondToSignInChallengeHandler(params: {
  confirmationCode: string;
  session: string;
  username: string;
}): Promise<
  | {
      tokens: { idToken: string; refreshToken: string };
      user: Partial<IUserDocument>;
    }
  | { session: string }
> {
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
      return { session: data.Session };
    }

    const result = await _extractCustomResultFromAuthChallenge({
      authChallengeResult: data,
    });

    return result;
  } catch (err) {
    if (err.code === 'NotAuthorizedException')
      throw new CustomError(
        'Confirmation Code is invalid.',
        400,
        'CodeMismatchException'
      );
    throw new AWSCognitoError(err);
  }
}

/**
 * =======================================================================================================
 *  Extract user info and tokens from the cognito sign in response
 * @param params
 * =======================================================================================================
 */

export async function _extractCustomResultFromAuthChallenge(params: {
  authChallengeResult: AWS.CognitoIdentityServiceProvider.InitiateAuthResponse;
}): Promise<{
  tokens: { idToken: string; refreshToken: string };
  user: Partial<IUserDocument>;
}> {
  try {
    const { authChallengeResult } = params;
    const { IdToken, RefreshToken } = authChallengeResult.AuthenticationResult;
    const tokens = { idToken: IdToken, refreshToken: RefreshToken };
    const decodedToken = jwt_decode(IdToken) as IClaimsIdToken;
    const isKnownDetails = parseInt(decodedToken['custom:isKnownDetails']);
    const email = decodedToken.email;

    const emptyUser = {
      _id: '',
      name: '',
      businesses: [],
      email: '',
    };

    if (isKnownDetails > 0) {
      const user = await AccountService.getUserHandler({ email });
      if (!user) {
        await CognitoService.updateUserAttributes({
          attributes: [{ Name: 'custom:isKnownDetails', Value: '0' }],
          email,
        });
        return { tokens, user: emptyUser };
      }
      const { _id, name, businesses } = user;
      return { tokens, user: { _id, name, businesses, email } };
    } else
      return {
        tokens,
        user: emptyUser,
      };
  } catch (err) {
    throw err;
  }
}
