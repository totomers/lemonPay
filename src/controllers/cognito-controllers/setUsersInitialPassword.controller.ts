import { Context } from 'aws-lambda';
import { CognitoService } from 'src/services/cognito-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/customError';

/**
 * =======================================================================================================
 * Change Users Dummy Password Given Upon Sign-Up
 * =======================================================================================================
 */
export async function setUsersInitialPassword(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { password, accessToken } = event.body;
    const email = event.requestContext.authorizer?.claims?.email;
    if (!password || !accessToken || !email)
      throw new MissingParamsError('password, accessToken, email');

    const result = await CognitoService.setInitialUserPasswordHandler({
      accessToken,
      email,
      password,
    });
    return { data: result };
  } catch (err) {
    return { err };
  }
}
