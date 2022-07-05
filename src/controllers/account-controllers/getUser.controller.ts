import { Context } from 'aws-lambda';
import { AccountService } from 'src/services/account-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/Errors';

/**
 * =======================================================================================================
 * Get User Plain Details And Businesses
 * =======================================================================================================
 */
export async function getUser(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const email =
      event.requestContext.authorizer?.claims?.email || 'tomere@moveo.co.il';
    if (!email) throw new MissingParamsError('email');
    const data = await AccountService.getUserHandler({
      email,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
