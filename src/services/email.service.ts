import AWS from "aws-sdk";
import { CONFIG } from "src/config";

AWS.config.update({ region: CONFIG.SERVERLESS.REGION });

const SES = new AWS.SES();

/**
 * Sends client an email after a successful transaction.
 * @param params
 */

export async function sendTextEmailHandler(params: {
  text: string;
  subject: string;
  to: string;
  from?: string;
}): Promise<{} | AWS.AWSError> {
  try {
    const { to, from = "no-reply@lemonpayapp.com", text, subject } = params;
    const sendEmailRequest: AWS.SES.SendEmailRequest = {
      Source: from,
      Destination: { ToAddresses: [to] },
      Message: {
        Subject: { Data: subject },
        Body: {
          Text: {
            Data: text,
          },
        },
      },
    };

    const result = await SES.sendEmail(sendEmailRequest).promise();

    return result;
  } catch (err) {
    throw err;
  }
}

export const EmailService = {
  sendTextEmailHandler,
};
