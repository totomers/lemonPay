import AWS, { AWSError } from 'aws-sdk';
import { CONFIG } from 'src/config';
import { AWSSESError, CustomError, ERROR_TYPES } from 'src/utils/customError';

AWS.config.update({ region: CONFIG.SERVERLESS.REGION });

const SES = new AWS.SES();

/**
 *====================================================================================================
 * Sends client an email after a successful transaction.
 * @param params
 * *====================================================================================================
 */

export async function sendTextEmailHandler(params: {
  text: string;
  subject: string;
  to: string;
  from?: string;
  html?: string;
}): Promise<{} | AWS.AWSError> {
  try {
    const defaultHTML = `<html><head><title>Your Token</title><style>h1{color:#f00;}</style></head><body><h1>Hello </h1><div>Your Device Validation Token is YYY<br/>Simply copy this token and paste it into the device validation input field.</div></body></html>`;
    const {
      to,
      from = 'no-reply@lemonpayapp.com',
      text,
      subject,
      html = defaultHTML,
    } = params;
    const sendEmailRequest: AWS.SES.SendEmailRequest = {
      Source: from,
      Destination: { ToAddresses: [to] },
      Message: {
        Subject: { Data: subject },

        Body: {
          Text: {
            Data: text,
          },
          Html: {
            Data: html,
          },
        },
      },
    };
    console.log('sending an emaill');

    const result = await SES.sendEmail(sendEmailRequest).promise();

    return result;
  } catch (err) {
    throw new AWSSESError(err);
  }
}

export const EmailService = {
  sendTextEmailHandler,
};
