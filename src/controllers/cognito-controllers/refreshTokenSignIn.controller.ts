import { Context } from 'aws-lambda';
import { CognitoService } from 'src/services/cognito-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/customError';

/**
 * =======================================================================================================
 * Sign In User With Refresh Token
 * =======================================================================================================
 */
export async function refreshTokenSignIn(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    console.log('COOKIE FOUND: ', event.headers.Cookie);

    const { refreshToken } = event.body;

    if (!refreshToken) throw new MissingParamsError('refreshToken');
    const data = await CognitoService.refreshTokenSignInCognitoHandler({
      refreshToken,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
