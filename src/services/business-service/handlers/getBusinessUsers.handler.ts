import { connectToDatabase } from 'src/database/db';
import { Invitation } from 'src/database/models/invitation';
import { User } from 'src/database/models/user';

export async function getBusinessUsers(params: { _id: string }) {
  try {
    await connectToDatabase();
    const { _id } = params;
    const users = await User.find({ 'businesses.business': _id });

    const invitedUsers = await Invitation.find({
      businessId: _id,
      status: 'pending',
    }).select({ email: 1, createdAt: 1 });

    return { invitedUsers, users };
  } catch (error) {
    return error;
  }
}
