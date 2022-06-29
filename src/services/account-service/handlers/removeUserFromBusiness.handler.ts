import { connectToDatabase } from 'src/database/db';
import { User } from 'src/database/models/user';
import { CustomError, MongoCustomError } from 'src/utils/customError';
import { Business } from 'src/database/models/business';
// import { IBusinessDocument } from 'src/types/business.interface';

/**
 * ====================================================================================================
 * Remove Business User
 * @param params
 * ====================================================================================================
 */
export async function removeUserFromBusinessHandler(params: {
  userId: string;
  businessId: string;
}) {
  try {
    await connectToDatabase();

    const { userId, businessId } = params;

    await _blockUpdateIfRootUser(userId);

    const user = await User.findByIdAndUpdate(userId, {
      $pull: { businesses: { business: businessId } },
    });

    // add user to inactiveAccounts Collection?

    return user;
  } catch (err) {
    throw new MongoCustomError(err);
  }
}

async function _blockUpdateIfRootUser(userId: string) {
  try {
    const business = await Business.findOne({ rootUser: userId });
    if (business?._id)
      throw new CustomError(
        'Deletion of root users business is not allowed',
        400,
        'RootUserBusinessDeletionException'
      );
  } catch (error) {
    throw error;
  }
}
