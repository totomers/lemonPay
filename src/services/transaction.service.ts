import { connectToDatabase } from "src/database/db";
import { Transaction } from "src/database/models/transaction";
import { ITransactionDocument } from "src/types/transaction.interface";
import {
  AWSSESError,
  CustomError,
  MongoCustomError,
} from "src/utils/customError";
import { EmailService } from "./email.service";

/**
 * Save transaction in DB.
 * @param params
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
 * Sends client an email after a successful transaction.
 * @param params
 */

export async function emailClientInvoiceHandler(params: {
  name: string;
  email: string;
}): Promise<{} | CustomError> {
  try {
    const { email, name } = params;
    // const sendEmailRequest: AWS.SES.SendEmailRequest = {
    //   Source: "no-reply@lemonpayapp.com",
    //   Destination: { ToAddresses: [email] },
    //   Message: {
    //     Subject: { Data: "Successful Transction" },

    //     Body: {
    //       Text: {
    //         Data: `Hi ${name}, your transction with XXX has been successful`,
    //       },
    //     },
    //   },
    // };
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
};
