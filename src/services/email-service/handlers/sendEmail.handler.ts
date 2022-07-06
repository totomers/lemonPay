import { CONFIG } from 'src/config';
import { NodeMailerOutlookError } from 'src/utils/Errors';
import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
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
    console.log('CONFIG.SENDGRID.APIKEY', CONFIG.SENDGRID.APIKEY);

    sgMail.setApiKey(CONFIG.SENDGRID.APIKEY);

    const { to, from = 'no-reply@lemonpay.nl', text, subject, html } = params;
    const msg = {
      to,
      from: CONFIG.SENDGRID.FROM_ADDRESS,
      text,
      html,
      subject,
    };

    // const result = await transporter.sendMail({
    //   to,
    //   from: CONFIG.SENDGRID.FROM_ADDRESS,
    //   text,
    //   html,
    //   subject,
    // });
    const result = await sgMail.send(msg);
    console.log('email result:', result);

    return result;
  } catch (err) {
    console.log(err);

    throw new NodeMailerOutlookError(err);
  }
}
