import { connectToDatabase } from 'src/database/db';
import { MongoCustomError } from 'src/utils/Errors';
import { IInvitationDocument } from 'src/types/invitation.interface';
import { Invitation } from 'src/database/models/invitation';
import { AccountService } from '..';

/**
 * ====================================================================================================
 * Check if user's email has been invited and if so create a new user under the business else return null
 * @param params
 * ====================================================================================================
 */
export async function fetchInvitedUserHandler(params: {
  email: string;
  name: string;
}): Promise<{
  _id: string;
  email: string;
  name: string;
  businesses: any;
} | null> {
  try {
    await connectToDatabase();

    const { email, name } = params;

    const invitation = (await Invitation.findOne({
      email,
    })) as IInvitationDocument;

    if (!invitation?._id) return null;

    const businessId = invitation.businessId as string;
    const user = await AccountService.createBusinessUserHandler({
      user: { email, name },
      businessId,
      role: invitation.role,
    });

    await Invitation.findByIdAndUpdate(invitation._id, { status: 'accepted' });

    return user;
  } catch (err) {
    throw new MongoCustomError(err);
  }
}
