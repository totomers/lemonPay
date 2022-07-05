import { Context } from 'aws-lambda';
import { CognitoService } from 'src/services/cognito-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/Errors';

/**
 * =======================================================================================================
 * Sign In lemon pay admin user
 * =======================================================================================================
 */
export async function signInLemonPayAdmin(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { email, password } = event.body;

    if (!email || !password) throw new MissingParamsError('email, password');

    const data = await CognitoService.signInLemonPayAdminHandler({
      email,
      password,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
