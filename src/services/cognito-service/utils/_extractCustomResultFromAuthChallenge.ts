import { AccountService } from './account.service';
import jwt_decode from 'jwt-decode';
import { IClaimsIdToken } from 'src/types/claimsIdToken.interface';

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
  user: Partial<{
    _id: string;
    email: string;
    name: string;
    businesses: any;
    status: any;
  }>;
}> {
  try {
    const { authChallengeResult } = params;

    const { IdToken, RefreshToken } = authChallengeResult.AuthenticationResult;
    const tokens = { idToken: IdToken, refreshToken: RefreshToken };

    const decodedToken = jwt_decode(IdToken) as IClaimsIdToken;
    const isKnownDetails = parseInt(decodedToken['custom:isKnownDetails']);
    const email = decodedToken.email;

    const userStatus = await CognitoService.getUserStatusHandler({ email });
    const emptyUser = {
      _id: '',
      name: '',
      businesses: [],
      email: '',
      status: userStatus,
    };

    if (isKnownDetails > 0) {
      const user = await AccountService.getUserHandler({ email });
      if (!user) {
        await updateUserAttributes({
          attributes: [{ Name: 'custom:isKnownDetails', Value: '0' }],
          email,
        });
        return { tokens, user: emptyUser };
      }
      const { _id, name, businesses, status } = user;
      return { tokens, user: { _id, name, businesses, email, status } };
    } else
      return {
        tokens,
        user: emptyUser,
      };
  } catch (err) {
    throw err;
  }
}
