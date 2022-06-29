import mongoose from 'mongoose';
import { connectToDatabase } from 'src/database/db';
import { User } from 'src/database/models/user';
import { CognitoService } from 'src/services/cognito-service';
import { IUserDocument } from 'src/types/user.interface';
import { CustomError, MongoCustomError } from 'src/utils/customError';

/**
 * ====================================================================================================
 * Change User Role
 * @param params
 * ====================================================================================================
 */
export async function changeUserRoleHandler(params: {
  userId: Partial<IUserDocument>;
  businessId: string;
  role: 'USER' | 'ADMIN';
}): Promise<{}> {
  try {
    await connectToDatabase();

    const { userId, businessId, role } = params;

    const user = (await User.findById(userId)) as IUserDocument;

    if (!user._id)
      return new CustomError(
        'User does not exist.',
        400,
        'UserNotFoundException'
      );
    const index = user.businesses.findIndex(
      (b) => b.business == (businessId as any)
    );
    user.businesses[index].role = role;
    await user.save();

    await CognitoService.updateUserAttributes({
      email: user.email,
      attributes: [
        { Name: 'custom:isAdmin', Value: role === 'ADMIN' ? '1' : '0' },
      ],
    });

    return {};
  } catch (err) {
    throw new MongoCustomError(err);
  }
}
