import { IUserDocument } from "src/types/user.interface";
import { connectToDatabase } from "src/database/db";
import { IBusinessDocument } from "src/types/business.interface";
import { Business } from "src/database/models/business";
import { User } from "src/database/models/user";
import AWS from "aws-sdk";
import { CognitoService } from "./cognito.service";
import { CONFIG } from "src/config";
import {
  AWSCognitoError,
  CustomError,
  MongoCustomError,
} from "src/utils/customError";

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

    const newBusiness = await Business.create(business);

    const newUser = await User.create({
      ...user,
      business_id: newBusiness._id,
    });

    await CognitoService.updateUserAttribute({
      email: user.email,
      name: "custom:isKnownDetails",
      value: "1",
    });

    return { user: newUser, business: newBusiness };
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
      groupName: "verified",
      email,
    });

    await CognitoService.updateUserAttribute({
      email,
      name: "custom:isVerified",
      value: "1",
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
        console.log("is verified");
        resolve({ isVerified: true });
      }, 130);
    });
  } catch (err) {
    throw new CustomError(err.message, 500, err.code);
  }
}

export const AccountService = {
  createBusinessAccountHandler,
  verifyUserDetailsHandler,
};
