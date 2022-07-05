import { Context } from 'aws-lambda';
import { AccountService } from 'src/services/account-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/Errors';

/**
 * =======================================================================================================
 * Fetch Invited User
 * =======================================================================================================
 */
export async function fetchInvitedUser(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const email =
      event.requestContext.authorizer?.claims?.email || 'test1@moveo.co.il';
    const name = event.requestContext.authorizer?.claims?.name || 'John Smith';
    if (!email || !name) throw new MissingParamsError('email, name');
    const data = await AccountService.fetchInvitedUserHandler({
      name,
      email,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
