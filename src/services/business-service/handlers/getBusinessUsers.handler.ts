import { connectToDatabase } from 'src/database/db';
import { Invitation } from 'src/database/models/invitation';
import { User } from 'src/database/models/user';
import { IInvitationDocument } from 'src/types/invitation.interface';
import { IUserDocument } from 'src/types/user.interface';

export async function getBusinessUsers(params: { _id: string }) {
  try {
    await connectToDatabase();
    const { _id } = params;
    const approvedUsers = await User.find({ 'businesses.business': _id });

    const invitedUsers = await Invitation.find({
      businessId: _id,
      status: 'pending',
    }).select({ email: 1, createdAt: 1 });

    return { users: _formatAllUsers({ approvedUsers, invitedUsers }) };
  } catch (error) {
    return error;
  }
}

type GeneralBusinessUsersList = {
  _id: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'ROOT';
  status: 'pending' | 'approved' | 'declined' | 'accepted';
  name?: string;
}[];

function _formatAllUsers(props: {
  invitedUsers: IInvitationDocument[];
  approvedUsers: IUserDocument[];
}) {
  const { invitedUsers, approvedUsers } = props;
  let formattedInvitedUsers = _formatInvitedUsers(invitedUsers);
  let formattedApprovedUsers = _formatApprovedUsers(approvedUsers);

  return formattedApprovedUsers.concat(formattedInvitedUsers);
}

function _formatInvitedUsers(
  invitedUsers: IInvitationDocument[]
): GeneralBusinessUsersList {
  if (invitedUsers.length === 0) return [];
  return invitedUsers.map((u) => ({
    _id: u._id,
    email: u.email,
    role: u.role || 'USER',
    status: u.status || 'pending',
  }));
}

function _formatApprovedUsers(
  approvedUsers: IUserDocument[]
): GeneralBusinessUsersList {
  if (approvedUsers.length === 0) return [];
  return approvedUsers.map((u) => ({
    _id: u._id,
    email: u.email,
    name: u.name,
    role: u.businesses[0].role,
    status: 'approved',
  }));
}
