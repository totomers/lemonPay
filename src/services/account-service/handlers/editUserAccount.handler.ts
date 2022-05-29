/**
 * ====================================================================================================
 * Edit user
 * @param params
 * ====================================================================================================
 */

import { connectToDatabase } from 'src/database/db';
import { User } from 'src/database/models/user';
import { IUserDocument } from 'src/types/user.interface';
import { MongoCustomError } from 'src/utils/customError';

export async function editUserAccountHandler(params: {
  email: string;
  edittedUser: Partial<IUserDocument>;
}): Promise<{ updatedUser: IUserDocument }> {
  try {
    await connectToDatabase();

    const { edittedUser, email } = params;

    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        edittedUser,
      }
    );

    // await CognitoService.updateUserAttributes({
    //   attributes:[{...},{...},{...}]
    //   email: user.email,
    // });

    return { updatedUser };
  } catch (err) {
    throw new MongoCustomError(err);
  }
}
