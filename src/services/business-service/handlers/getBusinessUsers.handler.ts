import { connectToDatabase } from 'src/database/db';
import { User } from 'src/database/models/user';

export async function getBusinessUsers(params: { _id: string }) {
  try {
    await connectToDatabase();
    const { _id } = params;
    const users = await User.find({ 'businesses.business': _id });

    return users;
  } catch (error) {
    return error;
  }
}
