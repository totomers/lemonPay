import { Context } from 'aws-lambda';
import { CognitoService } from 'src/services/cognito-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/customError';

/**
 * =======================================================================================================
 * Sign In User With Cognito DB
 * =======================================================================================================
 */
export async function signInUser(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { email, password } = event.body;

    if (!password || !email) throw new MissingParamsError('password, email');
    const data = await CognitoService.signInCognitoHandler({
      password,
      email,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
