import { IUserDocument } from "src/types/user.interface";
import { connectToDatabase } from "src/db";
import { IBusinessDocument } from "src/types/business.interface";
import { Business } from "src/models/business";
import { User } from "src/models/user";
import AWS from "aws-sdk";
import { CognitoService } from "./cognito.service";
AWS.config.update({ region: "us-east-1" });
/**
 * Create new user
 * @param params
 */

export async function createBusinessAccountHandler(params: {
  user: Partial<IUserDocument>;
  business: Partial<IBusinessDocument>;
}): Promise<{ user: IUserDocument; business: IBusinessDocument }> {
  try {
    await connectToDatabase();
    const { user, business } = params;
    const newBusiness = await Business.create(business);

    const newUser = await User.create({
      ...user,
      business_id: newBusiness._id,
    });

    return { user: newUser, business: newBusiness };
  } catch (err) {
    console.error(err);

    throw err;
  }
}

export async function verifyUserDetailsHandler(params: {
  user: Partial<IUserDocument>;
  email: string;
}): Promise<{ isVerified: any }> {
  try {
    const { user, email } = params;

    //Inject third party service for user identification and await for the response (assume response time is 10 minutes).
    const isVerified = await _verify(user);

    //Add user to "verified" group if verficiation results were successful.
    CognitoService.addUserToGroupCognitoHandler({
      groupName: "verified",
      email,
    });

    return { isVerified };
  } catch (err) {
    console.error(err);

    throw err;
  }
}

async function _verify(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("is verified");
      resolve({ isVerified: true });
    }, 15000);
  });
}

export const AccountService = {
  createBusinessAccountHandler,
  verifyUserDetailsHandler,
};
