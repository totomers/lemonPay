import { Context } from 'aws-lambda';
import { CognitoService } from 'src/services/cognito-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/Errors';

/**
 * =======================================================================================================
 * Initiate Custom Auth Challenge With Token
 * =======================================================================================================
 */
export async function initiateAuthChallengeWithToken(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const email = event.requestContext.authorizer?.claims?.email;
    if (!email) throw new MissingParamsError('email');
    const data = await CognitoService.initiateCustomAuthHandler({
      email,
      currentAuthChallenge: 'RESETPASS',
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
