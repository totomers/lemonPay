import { AWSCognitoError } from 'src/utils/customError';
import {
  AWS,
  clientId,
  cognitoidentityserviceprovider,
  userPoolId,
} from '../common';

/**
 * =======================================================================================================
 * Create new Lemon Pay Admin
 * @param params
 * =======================================================================================================
 */

export async function createLemonPayAdminHandler(params: {
  name: string;
  email: string;
  password: string;
}): Promise<AWS.CognitoIdentityServiceProvider.SignUpResponse | AWS.AWSError> {
  try {
    const { email, name, password } = params;

    const signUpRequest: AWS.CognitoIdentityServiceProvider.SignUpRequest = {
      Username: email,
      Password: password,
      ClientId: clientId,
      UserAttributes: [
        {
          Name: 'name',
          Value: name,
        },
        {
          Name: 'email',
          Value: email,
        },
        {
          Name: 'custom:isLemonPayAdmin',
          Value: '1',
        },
      ],
    };
    const result = await cognitoidentityserviceprovider
      .signUp(signUpRequest)
      .promise();

    const ConfirmUserRequest: AWS.CognitoIdentityServiceProvider.AdminConfirmSignUpRequest =
      { UserPoolId: userPoolId, Username: email };

    await cognitoidentityserviceprovider
      .adminConfirmSignUp(ConfirmUserRequest)
      .promise();

    return result;
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}
