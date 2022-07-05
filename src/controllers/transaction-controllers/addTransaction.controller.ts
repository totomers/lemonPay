import { Context } from 'aws-lambda';
import { TransactionService } from 'src/services/transaction-service';
import { IClaimsIdToken } from 'src/types/claimsIdToken.interface';
import { IPhosTransPayloadV2 } from 'src/types/phosTransPayloadV2.interface';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/Errors';
import { checkIfVerified } from 'src/utils/validators/validate-if-verified';

/**
 * =======================================================================================================
 * Add Transaction Details To DB.
 * =======================================================================================================
 */
export async function addTransaction(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    // const tokenClaims = event.requestContext.authorizer
    //   .claims as IClaimsIdToken;

    // checkIfVerified(tokenClaims);

    const transaction = event.body as IPhosTransPayloadV2;
    const data = await TransactionService.saveTransactionHandler({
      ...transaction,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
