import { Context } from 'aws-lambda';
import { CognitoService } from 'src/services/cognito-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/customError';

/**
 * =======================================================================================================
 * Create lemon pay admin user
 * =======================================================================================================
 */
export async function createLemonPayAdmin(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { name, email, password } = event.body;

    if (!name || !email || !password)
      throw new MissingParamsError('name, email, password');

    const data = await CognitoService.createLemonPayAdminHandler({
      name,
      email,
      password,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
