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
export async function getUserHandler(params: { email: string }) {
  try {
    await connectToDatabase();

    const { email = 'tomere@moveo.co.il' } = params;
    const user = (await User.findOne({ email })
      .populate({
        path: 'businesses',
        populate: {
          path: 'business',
          model: 'business',
          select: { businessName: 1, status: 1, referralCode: 1 },
        },
      })
      .exec()) as IUserDocument;

    const cleanedUser = _cleanUserObject(user);

    return cleanedUser;
  } catch (err) {
    throw new MongoCustomError(err);
  }
}

function _cleanUserObject(
  user:
    | (IUserDocument & { createdat: string; updatedat: string })
    | IUserDocument
) {
  delete user.__v;
  if ('createdat' in user) delete user.createdat;
  if ('updatedat' in user) delete user.updatedat;
  return user as IUserDocument;
}
