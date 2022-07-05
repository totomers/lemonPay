import { Context } from 'aws-lambda';
import { CognitoService } from 'src/services/cognito-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/Errors';

/**
 * =======================================================================================================
 * Send Email With OTP To Confirm Users Email & Add User To Cognito DB If Successful.
 * @returns accessToken,refreshToken,idToken
 * =======================================================================================================
 */
export async function confirmSignUpUser(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { email, confirmationCode } = event.body;
    if (!confirmationCode || !email)
      throw new MissingParamsError('confirmationCode, email');
    const data = await CognitoService.confirmSignUpCognitoHandler({
      confirmationCode,
      email,
    });

    return { data };
  } catch (err) {
    return { err };
  }
}
