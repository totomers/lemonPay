import { Context } from 'aws-lambda';
import { TransactionService } from 'src/services/transaction-service';
import { IClaimsIdToken } from 'src/types/claimsIdToken.interface';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/Errors';
import { checkIfRootUser } from 'src/utils/validators/validate-if-rootUser';

/**
 * =======================================================================================================
 * Get User Transactions History From DB.
 * =======================================================================================================
 */
export async function getBusinessTransactionsHistory(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    checkIfRootUser(event);
    const tokenClaims = event.requestContext.authorizer
      .claims as IClaimsIdToken;

    const querystring = event?.queryStringParameters;
    const businessId = querystring?.businessId;
    if (!businessId) throw new MissingParamsError('businessId');

    const data = await TransactionService.getBusinessTransactionsHistoryHandler(
      {
        businessId,
      }
    );
    return { data };
  } catch (err) {
    return { err };
  }
}
