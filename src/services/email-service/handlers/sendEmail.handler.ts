import { CONFIG } from 'src/config';
import { NodeMailerOutlookError } from 'src/utils/Errors';
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  host: 'smtp.office365.com',
  port: 587, // secure SMTP
  auth: {
    user: CONFIG.EMAIL.ADDRESS,
    pass: CONFIG.EMAIL.PASSWORD,
  },
});

/**
 *====================================================================================================
 * Sends client an email after a successful transaction.
 * @param params
 * *====================================================================================================
 */

export async function sendEmailHandler(params: {
  text: string;
  subject: string;
  to: string;
  from?: string;
  html?: string;
}): Promise<{} | AWS.AWSError> {
  try {
    const defaultHTML = `<html><head><title>Your Token</title><style>h1{color:#f00;}</style></head><body><h1>Hello </h1><div>Your Device Validation Token is YYY<br/>Simply copy this token and paste it into the device validation input field.</div></body></html>`;
    const { to, from = 'no-reply@lemonpay.nl', text, subject, html } = params;

    const result = await transporter.sendMail({
      to,
      from,
      text,
      html,
      subject,
    });

    return result;
  } catch (err) {
    throw new NodeMailerOutlookError(err);
  }
}
