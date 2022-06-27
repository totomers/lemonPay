import { Context, VerifyAuthChallengeResponseTriggerEvent } from 'aws-lambda';
import { CognitoService } from 'src/services/cognito-service';
import { MissingParamsError } from 'src/utils/customError';

/**
 * =======================================================================================================
 * Verify Custom Auth Challenge
 * =======================================================================================================
 */
export async function verifyAuthChallenge(
  event?: VerifyAuthChallengeResponseTriggerEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    if (!event) throw new MissingParamsError('event');
    const data = await CognitoService.verifyAuthChallengeHandler({ event });
    return { data };
  } catch (err) {
    return { err };
  }
}
