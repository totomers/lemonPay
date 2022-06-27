import { Context } from 'aws-lambda';
import { TransactionService } from 'src/services/transaction-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/customError';

/**
 * =======================================================================================================
 * Send client email with text after successful transaction has been made.
 * =======================================================================================================
 */
export async function emailReceipt(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { email, name } = event.requestContext.authorizer.claims;
    if (!email || !name) throw new MissingParamsError('email,name');
    const data = await TransactionService.emailReceiptHandler({
      name,
      email,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
