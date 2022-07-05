import { connectToDatabase } from 'src/database/db';
import { Business } from 'src/database/models/business';

import { EmailService } from 'src/services/email-service';
import { IBusinessDocument } from 'src/types/business.interface';
import {
  AdminOnlyError,
  MongoCustomError,
  NodeMailerOutlookError,
} from 'src/utils/Errors';

export async function declineBusinessHandler(params: {
  _id: string;
  email: string;
}): Promise<IBusinessDocument> {
  try {
    await connectToDatabase();
    const { _id, email } = params;
    const approvedBusiness = await Business.findByIdAndUpdate(
      _id,
      {
        status: 'unverified',
      },
      { new: true }
    )
      .populate('rootUser')
      .exec();

    await _sendBusinessDeclineEmail(email);

    return approvedBusiness;
  } catch (err) {
    if (err instanceof AdminOnlyError) throw err;
    else throw new MongoCustomError(err);
  }
}

async function _sendBusinessDeclineEmail(email: string) {
  try {
    const to = email;
    const subject = 'Unsuccessful Business Verification';
    const html = `<html><head><title> Your Business</title></head><body><h1>Hello </h1><div>Your business was not successfully verified<br/> You may contact us for further details.</div></body></html>`;
    const text = '';
    await EmailService.sendEmailHandler({ to, subject, html, text });

    return;
  } catch (error) {
    throw new NodeMailerOutlookError(error);
  }
}
