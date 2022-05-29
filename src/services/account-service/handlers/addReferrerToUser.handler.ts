import { connectToDatabase } from 'src/database/db';
import { User } from 'src/database/models/user';
import { IUserDocument } from 'src/types/user.interface';
import { CustomError, MongoCustomError } from 'src/utils/customError';

/**
 * ====================================================================================================
 * Edit user
 * @param params
 * ====================================================================================================
 */

export async function addReferrerToUserHandler(params: {
  userId: string;
  referralCode: string;
}): Promise<{ updatedUser: IUserDocument } | CustomError> {
  try {
    await connectToDatabase();

    const { userId, referralCode } = params;

    const referringUser = await User.findById({ referralCode });
    if (referringUser.refferralCode === referralCode)
      throw new CustomError(
        'Self Referring Is Not Valid',
        400,
        'ReferralCodeMismatchException'
      );
    if (referringUser?._id)
      throw new CustomError(
        'No user found with the given referral code',
        400,
        'ReferralCodeMismatchException'
      );
    const updatedUser = await User.findOneAndUpdate(
      { userId },
      {
        referrer: referringUser._id,
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
