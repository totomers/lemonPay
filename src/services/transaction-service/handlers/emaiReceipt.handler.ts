/**
 * ====================================================================================================
 * Sends client an email after a successful transaction.
 * @param params
 * ====================================================================================================
 */

import { EmailService } from 'src/services/email-service';
import { NodeMailerOutlookError } from 'src/utils/Errors';

export async function emailReceiptHandler(params: {
  name: string;
  email: string;
}): Promise<{}> {
  try {
    const { email, name } = params;
    const to = email;
    const subject = 'Successful Transction';
    const text = `Hi ${name}, your transction with XXX has been successful`;
    const result = await EmailService.sendEmailHandler({
      to,
      subject,
      text,
    });

    return result;
  } catch (err) {
    throw new NodeMailerOutlookError(err);
  }
}
