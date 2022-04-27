import { CustomError } from "src/utils/customError";
import { EmailService } from "./email.service";
/**
 * Sends client an email after a successful transaction.
 * @param params
 */

export async function sendClientEmailAfterTransactionHandler(params: {
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
    throw err;
  }
}

export const TransactionService = {
  sendClientEmailAfterTransactionHandler,
};
