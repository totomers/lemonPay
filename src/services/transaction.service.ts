import mongoose from "mongoose";
import { connectToDatabase } from "src/database/db";
import { Transaction } from "src/database/models/transaction";
import { User } from "src/database/models/user";
import { ITransactionDocument } from "src/types/transaction.interface";
import {
  AWSSESError,
  CustomError,
  MongoCustomError,
} from "src/utils/customError";
import { EmailService } from "./email.service";

/**
 * ====================================================================================================
 * Save transaction in DB.
 * @param params
 * ====================================================================================================
 */

export async function createTransactionHandler(
  params: Partial<ITransactionDocument>
): Promise<ITransactionDocument> {
  try {
    await connectToDatabase();
    const result = await Transaction.create(params);
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
  email: string;
}): Promise<ITransactionDocument[]> {
  try {
    await connectToDatabase();
    const { email } = params;
    // const user = await User.findOne({ email });
    // if (!user._id) {
    //   throw new CustomError("No user found", 400, "NOUSERFOUND", "NOUSERFOUND");
    // }
    // console.log("userId:", user._id);
    const userId = new mongoose.Types.ObjectId("62693ba6f0dc49799623d8a5");
    const result = await Transaction.find({
      userId,
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
    const subject = "Successful Transction";
    const text = `Hi ${name}, your transction with XXX has been successful`;

    const result = await EmailService.sendTextEmailHandler({
      to,
      subject,
      text,
    });

    return result;
  } catch (err) {
    throw new AWSSESError(err);
  }
}

export const TransactionService = {
  emailClientInvoiceHandler,
  createTransactionHandler,
  getUserTransactionsHandler,
};
