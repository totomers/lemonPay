import { Context } from 'aws-lambda';
import { CognitoService } from 'src/services/cognito-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/Errors';

/**
 * =======================================================================================================
 * Reset User's Password
 * =======================================================================================================
 */
export async function resetUserPassword(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { password, accessToken } = event.body;

    if (!password || !accessToken)
      throw new MissingParamsError('password, accessToken');

    const data = await CognitoService.resetUserPasswordHandler({
      password,
      accessToken,
    });
    return { data };
  } catch (err) {
    return { err, statusCode: err.code };
  }
}
