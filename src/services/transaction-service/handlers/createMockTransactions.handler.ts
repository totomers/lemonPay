/**
 * ====================================================================================================
 * Create mock transactions in DB.
 * @param params
 * ====================================================================================================
 */

import mongoose from 'mongoose';
import { connectToDatabase } from 'src/database/db';
import { Transaction } from 'src/database/models/transaction';
import { IPhosTransactionPayload } from 'src/types/phosTransPayload.interface';
import { ITransactionDocument } from 'src/types/transaction.interface';
import { MongoCustomError } from 'src/utils/customError';

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

    console.log('attempting to add transaction with details:', params);

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
    console.log('Oh no an error has occured: ', err);

    throw new MongoCustomError(err);
  }
}
