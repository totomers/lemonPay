import { InitiateAuthRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { IUserDocument } from 'src/types/user.interface';
import { isAlphaNumericalWithSpecialChar } from 'src/utils/validators/validate-password';
import { CognitoService } from '.';
import {
  AWSCognitoError,
  clientId,
  cognitoidentityserviceprovider,
  CustomError,
  userPoolId,
} from './common';
import { _extractCustomResultFromAuthChallenge } from './utils/_extractCustomResultFromAuthChallenge';
import { _getCustomAttribute } from './utils/_getCustomAttr';

/**
 * =======================================================================================================
 *  Initiates password reset process. Sends confirmation email to user to get permission to reset users password
 * @param params
 * =======================================================================================================
 */

export async function resetUserPasswordHandler(params: {
  password: string;
  accessToken: string;
}): Promise<{
  tokens: {
    idToken: string;
    refreshToken: string;
  };
  user: Partial<IUserDocument>;
}> {
  try {
    const { accessToken, password } = params;

    if (!isAlphaNumericalWithSpecialChar(password))
      throw new CustomError(
        'Password must consist of alphanumerical or special characters only.',
        400,
        'IllegalPassword'
      );

    const GetUserRequest: AWS.CognitoIdentityServiceProvider.GetUserRequest = {
      AccessToken: accessToken,
    };

    const user = await cognitoidentityserviceprovider
      .getUser(GetUserRequest)
      .promise();

    if (
      _getCustomAttribute(user.UserAttributes, 'custom:isPasswordMutable')
        .Value === '0'
    ) {
      throw new CustomError(
        'Password is currently not mutable for this user',
        400,
        'PasswordNotMutable'
      );
    }
    const email = user.Username;

    const AdminSetUserPasswordRequest: AWS.CognitoIdentityServiceProvider.AdminSetUserPasswordRequest =
      {
        UserPoolId: userPoolId,
        Permanent: true,
        Password: password,
        Username: email,
      };
    await cognitoidentityserviceprovider
      .adminSetUserPassword(AdminSetUserPasswordRequest)
      .promise();

    await CognitoService.updateUserAttributes({
      attributes: [{ Name: 'custom:isPasswordMutable', Value: '0' }],
      email,
    });

    const SignInRequest: InitiateAuthRequest = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: clientId,
      AuthParameters: { USERNAME: email, PASSWORD: password },
    };

    const data = await cognitoidentityserviceprovider
      .initiateAuth(SignInRequest)
      .promise();

    const result = await _extractCustomResultFromAuthChallenge({
      authChallengeResult: data,
    });

    return result;
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}
