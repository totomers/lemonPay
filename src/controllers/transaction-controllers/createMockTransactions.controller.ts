import { Context } from 'aws-lambda';
import { TransactionService } from 'src/services/transaction-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';

/**
 * =======================================================================================================
 * Add Transaction Details To DB.
 * =======================================================================================================
 */
export async function createMockTransactions(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    // const tokenClaims = event.requestContext.authorizer
    //   .claims as IClaimsIdToken;

    // checkIfVerified(tokenClaims);

    const data = await TransactionService.createMockTransactionsHandler();
    return { data };
  } catch (err) {
    return { err };
  }
}
