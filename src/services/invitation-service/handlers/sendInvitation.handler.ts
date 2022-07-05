import { connectToDatabase } from 'src/database/db';
import { Business } from 'src/database/models/business';
import { Invitation } from 'src/database/models/invitation';
import { EmailService } from 'src/services/email-service';
import { IBusinessDocument } from 'src/types/business.interface';
import { IInvitationDocument } from 'src/types/invitation.interface';
import { CustomError, MongoCustomError } from 'src/utils/Errors';

export async function sendInvitationHandler(params: {
  businessId: string;
  email: string;
  role: 'USER' | 'ADMIN';
}): Promise<{}> {
  try {
    await connectToDatabase();
    const { businessId, email, role } = params;

    await _validateInvitationEmail({ email, businessId });

    const newInvitation = {
      businessId,
      email,
      role,
    } as Partial<IInvitationDocument>;

    const result = await Invitation.findOneAndUpdate(
      { email, businessId, role },
      newInvitation,
      { new: true, upsert: true }
    );

    await _emailUserInvite({ businessId, email });

    return result;
  } catch (err) {
    console.log(err);
    throw new MongoCustomError(err);
  }
}

async function _validateInvitationEmail(params: {
  businessId: string;
  email: string;
}) {
  try {
    const { businessId, email } = params;
    const result = await Invitation.findOne({
      businessId,
      email,
      status: 'accepted',
    });
    if (result?._id)
      throw new CustomError(
        'User was already invited.',
        400,
        'UserInvitedException',
        'UserInvitedException'
      );
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function _emailUserInvite(params: { businessId: string; email: string }) {
  try {
    const { businessId, email } = params;

    const business = (await Business.findById(businessId)) as IBusinessDocument;

    const linkToLemonPayApp = '/link/app-store/lemonpay/';
    const text = '';
    const html = `<html>
    <head><title>Invitation</title></head>
    <body>
    <h1>Hello </h1>
    <div>You have been invited by ${business.businessTradeName} to join their account.</div>
    <p>  Get the app : <a href=${linkToLemonPayApp}> ${linkToLemonPayApp} </a> </p>
    </body>
    </html>`;
    const to = email;
    const subject = `${business.businessTradeName} | Business Invitation`;

    await EmailService.sendEmailHandler({ text, html, to, subject });
  } catch (err) {
    console.error(err);
    throw err;
  }
}
