import { connectToDatabase } from 'src/database/db';
import { User } from 'src/database/models/user';
import { IBusinessDocument } from 'src/types/business.interface';
import { IUserDocument } from 'src/types/user.interface';
import { MongoCustomError } from 'src/utils/customError';
import { generateRefCode } from 'src/utils/referralCodeGen';

/**
 * ====================================================================================================
 * Create Admin User
 * @param params
 * ====================================================================================================
 */
export async function createAdminUserHandler(params: {
  user: Partial<IUserDocument>;
  business: Partial<IBusinessDocument>;
}): Promise<{ user: IUserDocument }> {
  try {
    await connectToDatabase();
    const { user, business } = params;

    const referralCode = await _generateUserRefCode();

    const newUser = await User.create({
      ...user,
      referralCode,
      defaultBusiness: business._id,
      businesses: [{ business: business._id, role: 'ADMIN' }],
    });

    return { user: newUser };
  } catch (err) {
    throw new MongoCustomError(err);
  }
}

async function _generateUserRefCode(): Promise<string> {
  try {
    const referralCode = generateRefCode();
    const userFound = await User.findOne({ referralCode });
    if (userFound?._id) await _generateUserRefCode();
    return referralCode;
  } catch (err) {
    throw new MongoCustomError(err);
  }
}
