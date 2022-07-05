import { Context } from 'aws-lambda';
import { CognitoService } from 'src/services/cognito-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/Errors';

/**
 * =======================================================================================================
 * Get User Status If User Is Has Changed Password, Has Registered Business & Personal Details
 * =======================================================================================================
 */
export async function getUserStatus(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const email = event.requestContext.authorizer?.claims?.email;
    if (!email) throw new MissingParamsError('email');
    const data = await CognitoService.getUserStatusHandler({
      email,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
