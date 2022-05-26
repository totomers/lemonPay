import { AccountService } from '../../account-service';
import { CognitoService } from '..';
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
  }>;
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
