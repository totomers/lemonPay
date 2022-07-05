import { Context } from 'aws-lambda';
import { TransactionService } from 'src/services/transaction-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/Errors';

/**
 * =======================================================================================================
 * Get User Transactions History From DB.
 * =======================================================================================================
 */
export async function getUserTransactionsHistory(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    // const tokenClaims = event.requestContext.authorizer
    //   .claims as IClaimsIdToken;

    // checkIfVerified(tokenClaims);

    const querystring = event?.queryStringParameters;
    const businessId = querystring?.businessId;
    const userId = querystring?.userId;

    if (!userId || !businessId)
      throw new MissingParamsError('userId, businessId');

    const data = await TransactionService.getUserTransactionsHistoryHandler({
      userId,
      businessId,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
