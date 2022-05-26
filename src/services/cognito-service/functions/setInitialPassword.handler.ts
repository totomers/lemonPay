import { AWSCognitoError, CustomError } from 'src/utils/customError';
import { CognitoService } from '..';
import { cognitoidentityserviceprovider } from '../common';
import { isAlphaNumericalWithSpecialChar } from '../utils/_validatePassword';

export async function setInitialUserPasswordHandler(params: {
  email;
  accessToken: string;
  password: string;
}): Promise<
  AWS.CognitoIdentityServiceProvider.ChangePasswordResponse | AWS.AWSError
> {
  try {
    const { email, accessToken, password } = params;

    if (!isAlphaNumericalWithSpecialChar(password))
      throw new CustomError(
        'Password must consist of alphanumerical or special characters only.',
        400,
        'IllegalPassword'
      );

    const changePasswordRequest: AWS.CognitoIdentityServiceProvider.ChangePasswordRequest =
      {
        AccessToken: accessToken,
        PreviousPassword: process.env.COGNITO_USER_DUMMY_PASSWORD,
        ProposedPassword: password,
      };
    const result = await cognitoidentityserviceprovider
      .changePassword(changePasswordRequest)
      .promise();

    await CognitoService.updateUserAttributes({
      email,
      attributes: [{ Name: 'custom:isInitiated', Value: '1' }],
    });

    return result;
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}
