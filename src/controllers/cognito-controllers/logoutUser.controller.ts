import { Context } from 'aws-lambda';
import { CognitoService } from 'src/services/cognito-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/customError';

/**
 * =======================================================================================================
 * Log Out User Cognito DB
 * =======================================================================================================
 */
export async function logoutUser(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { refreshToken } = event.body;

    if (!refreshToken) throw new MissingParamsError('refreshToken');
    const data = await CognitoService.logoutUserHandler({
      refreshToken,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
