import { connectToDatabase } from 'src/database/db';
import { User } from 'src/database/models/user';
import { IUserDocument } from 'src/types/user.interface';
import { MongoCustomError } from 'src/utils/customError';

/**
 * ====================================================================================================
 * Get User
 * @param params
 * ====================================================================================================
 */
export async function getBusinessAdminListHandler() {
  try {
    await connectToDatabase();

    const users = (await User.find()
      .select({ _id: 1, name: 1, email: 1 })
      .populate({
        path: 'businesses',
        populate: {
          path: 'business',
          model: 'business',
          select: { businessName: 1, status: 1, referralCode: 1 },
        },
      })
      .exec()) as IUserDocument[];

    return users;
  } catch (err) {
    throw new MongoCustomError(err);
  }
}
