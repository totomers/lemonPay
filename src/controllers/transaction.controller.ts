import { Context } from 'aws-lambda';
import { TransactionService } from 'src/services/transaction-service';
import { IClaimsIdToken } from 'src/types/claimsIdToken.interface';
import { IPhosTransactionPayload } from 'src/types/phosTransPayload.interface';
import { ITransactionDocument } from 'src/types/transaction.interface';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/customError';
import { checkIfVerified } from 'src/utils/validators/validate-if-verified';

/**
 * =======================================================================================================
 * Add Transaction Details To DB.
 * =======================================================================================================
 */
export async function addTransaction(event?: any, context?: Context) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    // const tokenClaims = event.requestContext.authorizer
    //   .claims as IClaimsIdToken;

    // checkIfVerified(tokenClaims);

    const {
      merchantIdentifier,
      transaction,
      userIdentifier,
      terminalIdentifier,
    } = event.body as Partial<IPhosTransactionPayload>;
    const data = await TransactionService.createTransactionHandler({
      merchantIdentifier,
      transaction,
      userIdentifier,
      terminalIdentifier,
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
export async function emailReceipt(event?: any, context?: Context) {
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

/**
 * =======================================================================================================
 * Get User Transactions History From DB.
 * =======================================================================================================
 */
export async function getTransactionHistory(event?: any, context?: Context) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const tokenClaims = event.requestContext.authorizer
      .claims as IClaimsIdToken;

    checkIfVerified(tokenClaims);
    const { userId, businessId } = event.body;

    if (!userId || !businessId)
      throw new MissingParamsError('userId, businessId');

    const data = await TransactionService.getTransactionHistoryHandler({
      userId,
      businessId,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
/**
 * =======================================================================================================
 * Generate Token For Phos
 * =======================================================================================================
 */
export async function createPhosToken(
  event: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const { email } = event.requestContext.authorizer.claims;

    if (!email) throw new MissingParamsError('email');
    const userId = 'mongoDbUserId/otherUserId';
    const data = await TransactionService.createPhosTokenHandler({
      email,
      userId,
    });

    return { data };
  } catch (err) {
    return { err };
  }
}

/**
 * =======================================================================================================
 * Generate Token For Phos
 * =======================================================================================================
 */
export async function validatePhosToken(
  event: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const { preSharedPhosKey, token } = event.body;
    if (!preSharedPhosKey || !token)
      throw new MissingParamsError('pre-shared key, token');
    const data = await TransactionService.validatePhosTokenHandler({
      preSharedPhosKey,
      token,
    });

    return { data };
  } catch (err) {
    return { err };
  }
}

export const TransactionController = {
  emailReceipt,
  addTransaction,
  getTransactionHistory,
  createPhosToken,
  validatePhosToken,
};
