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
export async function getUserFullDetailsHandler(params: { email: string }) {
  try {
    await connectToDatabase();

    const { email = 'tomere@moveo.co.il' } = params;
    const user = (await User.findOne({ email })
      .select({ createdAt: 0, updatedAt: 0, __v: 0 })
      .populate({
        path: 'businesses',
        populate: {
          path: 'business',
          model: 'business',
          select: { businessName: 1, status: 1, referralCode: 1 },
        },
      })
      .exec()) as IUserDocument;

    return user;
  } catch (err) {
    throw new MongoCustomError(err);
  }
}
