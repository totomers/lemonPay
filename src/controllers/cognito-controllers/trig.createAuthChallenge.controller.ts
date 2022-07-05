import { Context, CreateAuthChallengeTriggerEvent } from 'aws-lambda';
import { CognitoService } from 'src/services/cognito-service';
import { MissingParamsError } from 'src/utils/Errors';

/**
 * =======================================================================================================
 * Create Custom Auth Challenge
 * =======================================================================================================
 */
export async function createAuthChallenge(
  event?: CreateAuthChallengeTriggerEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    if (!event) throw new MissingParamsError('event');
    const data = await CognitoService.createAuthChallengeHandler({ event });
    return { data };
  } catch (err) {
    return { err };
  }
}
