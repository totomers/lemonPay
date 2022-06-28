import { connectToDatabase } from 'src/database/db';
import { Transaction } from 'src/database/models/transaction';
import { ITransactionDocument } from 'src/types/transaction.interface';
import { MongoCustomError } from 'src/utils/customError';
/**
 * ====================================================================================================
 * Get All User Transaction History in DB.
 * @param params
 * ====================================================================================================
 */
export async function getUserTransactionsHistoryHandler(params: {
  userId: string;
  businessId: string;
}): Promise<{ transactions: ITransactionDocument[] }> {
  try {
    await connectToDatabase();
    const { userId, businessId } = params;
    const result = await Transaction.find({
      userId,
      businessId,
    }).select({
      _id: 1,
      businessId: 1,
      userId: 1,
      transactionType: 1,
      approvedAmount: 1,
      approvalTime: 1,
      transactionNumber: 1,
      cardNumber: 1,
      cardType: 1,
      status: 1,
      createdAt: 1,
      updatedAt: 1,
    });
    return { transactions: result };
  } catch (err) {
    throw new MongoCustomError(err);
  }
}
