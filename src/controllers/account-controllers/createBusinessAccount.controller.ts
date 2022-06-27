import { Context } from 'aws-lambda';
import { AccountService } from 'src/services/account-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/customError';

/**
 * =======================================================================================================
 * Create Business Account
 * =======================================================================================================
 */
export async function createBusinessAccount(
  event: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const email =
      event.requestContext.authorizer?.claims?.email || 'tomere@moveo.co.il';
    const name = event.requestContext.authorizer?.claims?.name || 'tomer eyal';
    if (!email || !name) throw new MissingParamsError('email, name');

    const user = { ...event.body.user, email, name };
    const business = event.body.business;
    //ADD PARAM VALIDATION FOR USER AND BUSINESS
    const data = await AccountService.createBusinessRootAccountHandler({
      user,
      business,
    });

    return { data };
  } catch (err) {
    return { err };
  }
}
