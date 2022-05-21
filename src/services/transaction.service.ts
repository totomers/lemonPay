import { connectToDatabase } from 'src/database/db';
import { Transaction } from 'src/database/models/transaction';
import jwt from 'jsonwebtoken';
import { CONFIG } from 'src/config';
import { InvalidPhosTokenOrKeyError } from 'src/utils/customError';
import { ITransactionDocument } from 'src/types/transaction.interface';
import {
  NodeMailerOutlookError,
  CustomError,
  MongoCustomError,
} from 'src/utils/customError';
import { EmailService } from './email.service';
import { IPhosTransactionPayload } from 'src/types/phosTransPayload.interface';
import mongoose from 'mongoose';

/**
 * ====================================================================================================
 * Save transaction in DB.
 * @param params
 * ====================================================================================================
 */

export async function createTransactionHandler(
  params: Partial<IPhosTransactionPayload>
): Promise<ITransactionDocument> {
  try {
    await connectToDatabase();
    const {
      merchantIdentifier,
      terminalIdentifier,
      userIdentifier,
      transaction,
    } = params;
    const {
      approvalNumber,
      approvedAmount,
      approvalTime,
      batchNumber,
      cardType,
      cardNumber,
      metadata,
      status,
      transactionId,
      transactionNumber,
      responseCode,
      transactionType,
      origTransactionId,
    } = transaction;

    const { bid, uid } = metadata;
    const userId = new mongoose.Types.ObjectId(uid);
    const businessId = new mongoose.Types.ObjectId(bid);
    //@ts-ignore
    const newTransaction = {
      phosMerchantIdentifier: merchantIdentifier,
      phosUserIdentifier: userIdentifier,
      phosTransactionId: transactionId,
      phosTerminalIdentifier: terminalIdentifier,
      businessId,
      userId,
      approvalNumber,
      approvedAmount,
      approvalTime,
      responseCode,
      batchNumber,
      cardType,
      cardNumber,
      status,
      transactionNumber,
      transactionType,
      origTransactionId,
    } as Partial<ITransactionDocument>;

    const result = await Transaction.create(newTransaction);
    return result;
  } catch (err) {
    throw new MongoCustomError(err);
  }
}

/**
 * ====================================================================================================
 * Get All User Transaction History in DB.
 * @param params
 * ====================================================================================================
 */

export async function getUserTransactionsHandler(params: {
  userId: string;
  businessId: string;
}): Promise<ITransactionDocument[]> {
  try {
    await connectToDatabase();
    const { userId, businessId } = params;
    const result = await Transaction.find({
      userId,
      businessId,
    });
    return result;
  } catch (err) {
    throw new MongoCustomError(err);
  }
}

/**
 * ====================================================================================================
 * Sends client an email after a successful transaction.
 * @param params
 * ====================================================================================================
 */

export async function emailClientInvoiceHandler(params: {
  name: string;
  email: string;
}): Promise<{} | CustomError> {
  try {
    const { email, name } = params;
    const to = email;
    const subject = 'Successful Transction';
    const text = `Hi ${name}, your transction with XXX has been successful`;
    const result = await EmailService.sendTextEmailHandler({
      to,
      subject,
      text,
    });

    return result;
  } catch (err) {
    throw new NodeMailerOutlookError(err);
  }
}
export async function createPhosTokenHandler(params: {
  email?: string;
  userId?: string;
}): Promise<{ token: string; issuer?: string }> {
  try {
    const { email, userId } = params;
    const secret = CONFIG.PHOS.TOKEN_GEN_SECRET;
    const token = jwt.sign({ email, userId }, secret, { expiresIn: '5m' });

    // Guy or I need to return with the token the 'issuer': 'phos-client-identifier-to-be-passed-to-the-SDK'
    return { token, issuer: 'phos-client-identifier-to-be-passed-to-the-SDK' };
  } catch (error) {}
}

export async function validatePhosTokenHandler(params: {
  token: string;
  preSharedPhosKey: string;
}): Promise<{ 'user-id': string }> {
  try {
    const { token, preSharedPhosKey } = params;
    const phosTokenGenSecret = CONFIG.PHOS.TOKEN_GEN_SECRET;
    const phosSecret = CONFIG.PHOS.PRE_SHARED_SECRET;

    if (phosSecret !== preSharedPhosKey) throw new Error();

    jwt.verify(token, phosTokenGenSecret);
    const decodedToken = jwt.decode(token) as { email: string; userId: string };

    const userId = decodedToken.userId;

    return { 'user-id': userId };
  } catch (error) {
    throw new InvalidPhosTokenOrKeyError();
  }
}

export const TransactionService = {
  emailClientInvoiceHandler,
  createTransactionHandler,
  getUserTransactionsHandler,
  createPhosTokenHandler,
  validatePhosTokenHandler,
};
