import { Context } from 'aws-lambda';
import { CognitoService } from 'src/services/cognito-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/Errors';

/**
 * =======================================================================================================
 * Respond To Reset Pass Auth Challenge
 * =======================================================================================================
 */
export async function respondToResetPassChallenge(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { session, confirmationCode, username } = event.body;

    if (!session || !confirmationCode || !username)
      throw new MissingParamsError('session, confirmationCode,username');
    const data = await CognitoService.respondToResetPassChallengeHandler({
      session,
      confirmationCode,
      username,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
