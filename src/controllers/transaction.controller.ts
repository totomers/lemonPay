import { Context } from "aws-lambda";
import { TransactionService } from "src/services/transaction.service";
import { ITransactionDocument } from "src/types/transaction.interface";

/**
 * =======================================================================================================
 * Add Transaction Details To DB.
 * =======================================================================================================
 */
export async function addTransaction(event?: any, context?: Context) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    // const { email, name } = event.requestContext.authorizer.claims;
    const { amount, businessId, currency, status, userId } =
      event.body as Partial<ITransactionDocument>;
    const data = await TransactionService.createTransactionHandler({
      amount,
      businessId,
      currency,
      status,
      userId,
    });
    return { data };
  } catch (err) {
    return { err, statusCode: err.code };
  }
}

/**
 * =======================================================================================================
 * Send client email with text after successful transaction has been made.
 * =======================================================================================================
 */
export async function emailClientInvoice(event?: any, context?: Context) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { email, name } = event.requestContext.authorizer.claims;
    const data = await TransactionService.emailClientInvoiceHandler({
      name,
      email,
    });
    return { data };
  } catch (err) {
    return { err, statusCode: err.code };
  }
}

export const TransactionController = {
  emailClientInvoice,
};
