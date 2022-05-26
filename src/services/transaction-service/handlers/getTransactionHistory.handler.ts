/**
 * ====================================================================================================
 * Get All User Transaction History in DB.
 * @param params
 * ====================================================================================================
 */

import { connectToDatabase } from 'src/database/db';
import { Transaction } from 'src/database/models/transaction';
import { ITransactionDocument } from 'src/types/transaction.interface';
import { MongoCustomError } from 'src/utils/customError';

export async function getTransactionHistoryHandler(params: {
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
