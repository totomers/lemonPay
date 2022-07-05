import { connectToDatabase } from 'src/database/db';
import { User } from 'src/database/models/user';
import { IUserDocument } from 'src/types/user.interface';
import { MongoCustomError } from 'src/utils/Errors';

/**
 * ====================================================================================================
 * Check If User Is Admin Of Given Business
 * @param params
 * ====================================================================================================
 */
export async function isUserABusinessAdmin(params: {
  email: string;
  businessId: string;
}) {
  try {
    await connectToDatabase();

    const { email, businessId } = params;
    const user = (await User.findOne({ email })) as IUserDocument;

    return (
      user.businesses.findIndex(
        (b) => b.business.toString() === businessId && b.role === 'ADMIN'
      ) > 0
    );
  } catch (err) {
    throw new MongoCustomError(err);
  }
}
