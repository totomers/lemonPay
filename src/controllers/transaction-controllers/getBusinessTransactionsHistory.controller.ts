import { Context } from 'aws-lambda';
import { TransactionService } from 'src/services/transaction-service';
import { IClaimsIdToken } from 'src/types/claimsIdToken.interface';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/customError';
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
    const tokenClaims = event.requestContext.authorizer
      .claims as IClaimsIdToken;

    checkIfRootUser(tokenClaims);
    const { businessId } = event.body;

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
