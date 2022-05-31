import { connectToDatabase } from 'src/database/db';
import { User } from 'src/database/models/user';
import { IBusinessDocument } from 'src/types/business.interface';
import { IUserDocument } from 'src/types/user.interface';
import { MongoCustomError } from 'src/utils/customError';
import { generateRefCode } from 'src/services/business-service/utils/referralCodeGen';

/**
 * ====================================================================================================
 * Create Admin User
 * @param params
 * ====================================================================================================
 */
export async function createAdminUserHandler(params: {
  user: Partial<IUserDocument>;
  business: Partial<IBusinessDocument>;
}): Promise<{
  _id: string;
  email: string;
  name: string;
  businesses: any;
}> {
  try {
    await connectToDatabase();
    const { user, business } = params;

    const newUser = (await User.create({
      ...user,
      businesses: [{ business: business._id, role: 'ADMIN' }],
    })) as IUserDocument;

    const adminBusiness = {
      business: {
        _id: business._id,
        name: business.businessName,
        status: business.status,
        referralCode: business.referralCode,
      },
      role: 'ADMIN',
    };

    const newAdminUser = {
      _id: newUser._id,
      email: newUser.email,
      name: user.name,
      businesses: [adminBusiness],
    };

    // const populatedUser = (await User.populate(newUser, {
    //   path: 'businesses',
    //   populate: {
    //     path: 'business',
    //     model: 'business',
    //     select: { businessName: 1, status: 1, referralCode: 1 },
    //   },
    // })) as IUserDocument;

    return newAdminUser;
  } catch (err) {
    throw new MongoCustomError(err);
  }
}
