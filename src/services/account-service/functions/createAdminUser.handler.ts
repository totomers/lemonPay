import { connectToDatabase } from 'src/database/db';
import { User } from 'src/database/models/user';
import { IBusinessDocument } from 'src/types/business.interface';
import { IUserDocument } from 'src/types/user.interface';
import { MongoCustomError } from 'src/utils/customError';
import { generateRefCode } from 'src/services/account-service/utils/referralCodeGen';

/**
 * ====================================================================================================
 * Create Admin User
 * @param params
 * ====================================================================================================
 */
export async function createAdminUserHandler(params: {
  user: Partial<IUserDocument>;
  business: Partial<IBusinessDocument>;
}): Promise<IUserDocument> {
  try {
    await connectToDatabase();
    const { user, business } = params;

    const newUser = new User({
      ...user,
      defaultBusiness: business._id,
      businesses: [{ business: business._id, role: 'ADMIN' }],
    });

    await newUser.save();

    const populatedUser = (await User.populate(newUser, {
      path: 'businesses',
      populate: {
        path: 'business',
        model: 'business',
        select: { businessName: 1, status: 1 },
      },
    })) as IUserDocument;

    return populatedUser;
  } catch (err) {
    throw new MongoCustomError(err);
  }
}
