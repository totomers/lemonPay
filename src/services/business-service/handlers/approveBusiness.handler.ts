import { connectToDatabase } from 'src/database/db';
import { Business } from 'src/database/models/business';

import { EmailService } from 'src/services/email-service';
import { IBusinessDocument } from 'src/types/business.interface';
import {
  AdminOnlyError,
  MongoCustomError,
  NodeMailerOutlookError,
} from 'src/utils/customError';

export async function approveBusinessHandler(params: {
  _id: string;
  merchantId: string;
  email: string;
}): Promise<IBusinessDocument> {
  try {
    await connectToDatabase();
    const { _id, merchantId, email } = params;
    const approvedBusiness = await Business.findByIdAndUpdate(
      _id,
      {
        status: 'verified',
        // merchantId,
      },
      { new: true }
    )
      .populate('rootUser')
      .exec();

    await _sendBusinessApprovalEmail(email);

    return approvedBusiness;
  } catch (err) {
    if (err instanceof AdminOnlyError) throw err;
    else throw new MongoCustomError(err);
  }
}

async function _sendBusinessApprovalEmail(email: string) {
  try {
    const to = email;
    const subject = 'Succesful Business Verification';
    const html = `<html><head><title> Your Business</title><style>h1{color:#ff0;}</style></head><body><h1>Hello </h1><div>Your business has been confirmed<br/> You may now start carrying out transactions.</div></body></html>`;
    const text = '';
    await EmailService.sendEmailHandler({ to, subject, html, text });

    return;
  } catch (error) {
    throw new NodeMailerOutlookError(error);
  }
}
