/**
 * ====================================================================================================
 * Save transaction in DB.
 * @param params
 * ====================================================================================================
 */

import mongoose from 'mongoose';
import { connectToDatabase } from 'src/database/db';
import { Transaction } from 'src/database/models/transaction';
import { CustomError } from 'src/services/cognito-service/common';
import { IPhosTransPayloadV2 } from 'src/types/phosTransPayloadV2.interface';
import { ITransactionDocument } from 'src/types/transaction.interface';
import { MongoCustomError } from 'src/utils/customError';

export async function saveTransactionHandler(
  params: IPhosTransPayloadV2
): Promise<ITransactionDocument> {
  try {
    await connectToDatabase();

    await _validateTransactionFields(params);

    const {
      affiliate,
      amount,
      authorizationCode,
      cardNumber,
      cardType,
      currency,
      deviceId,
      instance,
      latitude,
      longitude,
      merchantToken,
      metadata,
      mid,
      midToken,
      originalTransactionToken,
      responseCode,
      rrn,
      scaType,
      stan,
      status,
      storeToken,
      terminalToken,
      tid,
      tip,
      transactionTime,
      transactionTimeUTC,
      transactionToken,
      transactionType,
      userEmail,
      userToken,
    } = params;

    const { bid, uid } = metadata;
    const userId = new mongoose.Types.ObjectId(uid);
    const businessId = new mongoose.Types.ObjectId(bid);

    const newTransaction = {
      affiliate,
      phosMerchantToken: merchantToken,
      phosTerminalToken: terminalToken,
      phosTransactionToken: transactionToken,
      phosUserToken: userToken,
      businessId,
      userId,
      amount,
      authorizationCode,
      cardNumber,
      cardType,
      currency,
      deviceId,
      instance,
      latitude,
      longitude,
      mid,
      midToken,
      originalTransactionToken,
      responseCode,
      rrn,
      scaType,
      stan,
      status,
      storeToken,
      tid,
      tip,
      transactionTime,
      transactionTimeUTC,
      transactionType,
      userEmail,
    } as Partial<ITransactionDocument>;

    await _wasTransactionAlreadyStored(transactionToken);

    const result = await Transaction.create(newTransaction);

    return result;
  } catch (err) {
    console.log('Oh no an error has occured: ', err);
    throw new MongoCustomError(err);
  }
}

export async function _wasTransactionAlreadyStored(transactionToken: string) {
  try {
    const transaction = await Transaction.findOne({ transactionToken });
    if (transaction._id) return true;
  } catch (err) {
    throw new MongoCustomError(err);
  }
}

export async function _validateTransactionFields(
  transaction: IPhosTransPayloadV2
) {
  try {
    // custom authorization
    if (!transaction.authorizationCode)
      throw new CustomError('Validation field is wrong', 500, 'type', 'name');
  } catch (err) {
    throw new MongoCustomError(err);
  }
}
