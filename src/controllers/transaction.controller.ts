import { Context } from "aws-lambda";
import { TransactionService } from "src/services/transaction.service";
/**
 * Send client email with text after successful transaction has been made.
 */
export async function sendClientEmailAfterTransaction(
  event?: any,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { email, name } = event.requestContext.authorizer.claims;
    const data =
      await TransactionService.sendClientEmailAfterTransactionHandler({
        name,
        email,
      });
    return { data };
  } catch (err) {
    return { err, statusCode: err.code };
  }
}

export const TransactionController = {
  sendClientEmailAfterTransaction,
};
