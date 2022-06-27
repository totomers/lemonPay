import { Context } from 'aws-lambda';
import { CognitoService } from 'src/services/cognito-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/customError';

/**
 * =======================================================================================================
 * Sign Up User To Cognito DB
 * =======================================================================================================
 */
export async function resendConfirmationCode(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { email } = event.body;
    if (!email) throw new MissingParamsError('email');
    const data = await CognitoService.resendConfirmationCodeHandler({
      email,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
