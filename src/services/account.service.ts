import { IUserDocument } from 'src/types/user.interface';
import { connectToDatabase } from 'src/database/db';
import { IBusinessDocument } from 'src/types/business.interface';
import { User } from 'src/database/models/user';
import AWS from 'aws-sdk';
import { CognitoService } from './cognito.service';
import { CONFIG } from 'src/config';
import {
  AWSCognitoError,
  CustomError,
  ImageManagerError,
  MongoCustomError,
} from 'src/utils/customError';
import { BusinessService } from './business.service';
import { ImageService } from './image.service';
import { generateRefCode } from 'src/services/business-service/utils/referralCodeGen';

AWS.config.update({ region: CONFIG.SERVERLESS.REGION });

/**
 * ====================================================================================================
 * Create new user
 * @param params
 * ====================================================================================================
 */

export async function createBusinessAccountHandler(params: {
  user: Partial<IUserDocument>;
  business: Partial<IBusinessDocument>;
}): Promise<
  { user: IUserDocument; business: IBusinessDocument } | CustomError
> {
  try {
    await connectToDatabase();
    const { user, business } = params;

    const newBusiness = await BusinessService.createBusinessHandler(business);

    // Check If User with the same email exists

    const newUser = await createAdminUserHandler({
      user,
      business: newBusiness,
    });

    console.log('newUser', newUser);

    await CognitoService.updateUserAttributes({
      email: user.email,
      attributes: [{ Name: 'custom:isKnownDetails', Value: '1' }],
    });

    return { user: newUser.user, business: newBusiness };
  } catch (err) {
    throw new MongoCustomError(err);
  }
}

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
    const newUser = new User({
      ...user,
      referralCode,
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

    return { user: populatedUser };
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

/**
 * ====================================================================================================
 * Verify new user
 * @param params
 * ====================================================================================================
 */
export async function verifyUserDetailsHandler(params: {
  email: string;
}): Promise<{ isVerified: any } | CustomError> {
  try {
    const { email } = params;

    //Inject third party service for user identification and await for the response (assume response time is 10 minutes).
    const isVerified = await _verify({});

    //Add user to "verified" group if verficiation results were successful.
    await CognitoService.addUserToGroupCognitoHandler({
      groupName: 'verified',
      email,
    });

    await CognitoService.updateUserAttributes({
      email,
      attributes: [{ Name: 'custom:isVerified', Value: '1' }],
    });
    return { isVerified };
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}

async function _verify(user) {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('is verified');
        resolve({ isVerified: true });
      }, 130);
    });
  } catch (err) {
    throw new CustomError(err.message, 500, err.code);
  }
}

/**
 * ====================================================================================================
 * Upload Business Admin's Passport
 * @param params
 * ====================================================================================================
 */
export async function uploadAdminPassportHandler(params: {
  userId: string;
  image: string;
  mime: string;
}): Promise<{}> {
  try {
    await connectToDatabase();
    const { image, mime, userId } = params;
    const result = await ImageService.uploadImageHandler({ image, mime });
    console.log('imageUrl:', result.imageUrl);
    console.log(userId, result.imageUrl);

    await User.findByIdAndUpdate(userId, {
      verificationImage: result.imageUrl,
    });
    //if successful save the url to User Document in MongoDB
    return {};
  } catch (err) {
    console.log(err);
    if (err instanceof ImageManagerError) throw err;
    throw new MongoCustomError(err);
  }
}

/**
 * ====================================================================================================
 * Edit user
 * @param params
 * ====================================================================================================
 */

export async function editUserAccountHandler(params: {
  email: string;
  edittedUser: Partial<IUserDocument>;
}): Promise<{ updatedUser: IUserDocument } | CustomError> {
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
          select: { businessName: 1 },
        },
      })
      .exec()) as IUserDocument;

    const status = await CognitoService.getUserStatusHandler({ email });

    //@ts-ignore
    return { ...user._doc, status };
  } catch (err) {
    throw new MongoCustomError(err);
  }
}

export const AccountService = {
  createBusinessAccountHandler,
  verifyUserDetailsHandler,
  editUserAccountHandler,
  isUserABusinessAdmin,
  getUserHandler,
  uploadAdminPassportHandler,
  addReferrerToUserHandler,
};
