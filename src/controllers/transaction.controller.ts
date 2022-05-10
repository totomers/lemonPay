import { Context } from 'aws-lambda';
import { TransactionService } from 'src/services/transaction.service';
import { ITransactionDocument } from 'src/types/transaction.interface';
import { MissingParamsError } from 'src/utils/customError';

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
    return { err };
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
    if (!email || !name) throw new MissingParamsError('email,name');
    const data = await TransactionService.emailClientInvoiceHandler({
      name,
      email,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}

/**
 * =======================================================================================================
 * Get User Transactions History From DB.
 * =======================================================================================================
 */
export async function getUserTransactions(event?: any, context?: Context) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const email = event.requestContext.authorizer?.claims?.email;

    if (!email) throw new MissingParamsError('email');

    const data = await TransactionService.getUserTransactionsHandler({
      email,
    });
    return { data };
  } catch (err) {
    console.log('===================================OOPPPSSS');

    return { err };
  }
}

export const TransactionController = {
  emailClientInvoice,
  addTransaction,
  getUserTransactions,
};
