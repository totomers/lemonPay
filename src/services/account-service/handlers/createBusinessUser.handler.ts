import { connectToDatabase } from 'src/database/db';
import { Business } from 'src/database/models/business';
import { User } from 'src/database/models/user';
import { IBusinessDocument } from 'src/types/business.interface';
import { IUserDocument } from 'src/types/user.interface';
import { MongoCustomError } from 'src/utils/Errors';

/**
 * ====================================================================================================
 * Create Business User
 * @param params
 * ====================================================================================================
 */
export async function createBusinessUserHandler(params: {
  user: Partial<IUserDocument>;
  businessId: string;
  role: 'USER' | 'ADMIN';
}): Promise<{
  _id: string;
  email: string;
  name: string;
  businesses: any;
}> {
  try {
    await connectToDatabase();
    const { user, businessId, role } = params;

    const newUser = (await User.create({
      ...user,
      businesses: [{ business: businessId, role }],
    })) as IUserDocument;

    const business = await Business.findById(businessId)
      .select({ _id: 1, catalog: 1, referralCode: 1 })
      .populate('catalog');

    const newUserFormatted = {
      _id: newUser._id,
      email: newUser.email,
      name: user.name,
      businesses: [{ business, role }],
    };
    return newUserFormatted;
  } catch (err) {
    throw new MongoCustomError(err);
  }
}
