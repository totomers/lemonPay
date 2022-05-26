import { AWSCognitoError } from 'src/utils/customError';
import {
  clientId,
  cognitoidentityserviceprovider,
  userPoolId,
} from '../common';

export async function confirmEmailCognitoHandler(params: {
  email: string;
  confirmationCode: string;
}): Promise<{}> {
  try {
    const { email, confirmationCode } = params;
    console.log('process.env.STAGE:', process.env.STAGE);

    if (
      process.env.STAGE === 'DEV' &&
      confirmationCode === process.env.FAKE_CONFIRMATION_CODE_DEV_TESTING
    ) {
      const adminConfirmSignUpRequest: AWS.CognitoIdentityServiceProvider.AdminConfirmSignUpRequest =
        {
          Username: email,
          UserPoolId: userPoolId,
        };
      await cognitoidentityserviceprovider
        .adminConfirmSignUp(adminConfirmSignUpRequest)
        .promise();
    } else {
      const confirmSignUpRequest: AWS.CognitoIdentityServiceProvider.ConfirmSignUpRequest =
        {
          Username: email,
          ConfirmationCode: confirmationCode,
          ClientId: clientId,
        };
      await cognitoidentityserviceprovider
        .confirmSignUp(confirmSignUpRequest)
        .promise();
    }

    return {};
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}
