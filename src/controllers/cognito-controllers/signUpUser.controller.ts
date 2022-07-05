import { Context } from 'aws-lambda';
import { CognitoService } from 'src/services/cognito-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/Errors';

/**
 * =======================================================================================================
 * Sign Up User To Cognito DB
 * =======================================================================================================
 */
export async function signUpUser(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { name, email } = event.body;

    if (!name || !email) throw new MissingParamsError('name, email');

    const data = await CognitoService.signUpCognitoHandler({
      name,
      email,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
