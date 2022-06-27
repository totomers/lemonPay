import { Context, DefineAuthChallengeTriggerEvent } from 'aws-lambda';
import { CognitoService } from 'src/services/cognito-service';
import { MissingParamsError } from 'src/utils/customError';

/**
 * =======================================================================================================
 * Define Custom Auth Challenge
 * =======================================================================================================
 */
export async function defineCustomChallenge(
  event?: DefineAuthChallengeTriggerEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    if (!event) throw new MissingParamsError('event');
    const data = await CognitoService.defineAuthChallengeHandler({ event });
    return { data };
  } catch (err) {
    return { err };
  }
}
