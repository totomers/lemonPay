import {
  AWSCognitoError,
  clientId,
  cognitoidentityserviceprovider,
} from '../common';

/**
 * =======================================================================================================
 * Resend OTP to users email for confirmation
 * @param params
 * =======================================================================================================
 */

export async function resendConfirmationCodeHandler(params: {
  email: string;
}): Promise<AWS.CognitoIdentityServiceProvider.ConfirmSignUpResponse> {
  try {
    const { email } = params;

    const resendConfirmationCodeRequest: AWS.CognitoIdentityServiceProvider.ResendConfirmationCodeRequest =
      {
        Username: email,
        ClientId: clientId,
      };
    const result = await cognitoidentityserviceprovider
      .resendConfirmationCode(resendConfirmationCodeRequest)
      .promise();

    return result;
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}
