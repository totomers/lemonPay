import { IUserDocument } from "src/types/user.interface";
import { connectToDatabase } from "src/db";
import { IBusinessDocument } from "src/types/business.interface";
import { Business } from "src/models/business";
import { User } from "src/models/user";
import AWS from "aws-sdk";
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
  userPoolId: string;
  userName: string;
}): Promise<{ isVerified: any }> {
  try {
    // await connectToDatabase();
    const { user, userPoolId, userName } = params;
    console.log("verifying user");

    const isVerified = await _verify(user);
    //change custom attribute

    const cognitoidentityserviceprovider =
      new AWS.CognitoIdentityServiceProvider({
        apiVersion: "2016-04-18",
      });
    cognitoidentityserviceprovider.adminUpdateUserAttributes(
      {
        UserAttributes: [
          {
            Name: "name",
            Value: "Tomer",
          },
        ],
        UserPoolId: userPoolId,
        Username: userName,
      },
      (data) => {
        console.log("data recieved from AWS Cognito SDK call", data);
      }
    );

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
    }, 1000);
  });
}

export const AccountService = {
  createBusinessAccountHandler,
  verifyUserDetailsHandler,
};

// export class AccountService {
//   private User: Model<IUserDocument>;
//   private Business: Model<IBusinessDocument>;
//   constructor(User: Model<IUserDocument>, Business: Model<IBusinessDocument>) {
//     this.User = User;
//     this.Business = Business;
//   }

//   /**
//    * Create new user
//    * @param params
//    */

//   protected async createBusinessAccountDB(params: {
//     user: Partial<IUserDocument>;
//     business: Partial<IBusinessDocument>;
//   }): Promise<{ user: IUserDocument; business: IBusinessDocument }> {
//     try {
//       console.log("Reached server & trying to connect to database");
//       const { user, business } = params;
//       await connectToDatabase();
//       // const newBusiness = this.businessService.createBusiness(business);
//       const newBusiness = await this.Business.create(business);
//       const newUser = await this.User.create(user);

//       return { user: newUser, business: newBusiness };
//     } catch (err) {
//       console.error(err);

//       throw err;
//     }
//   }

//   /**
//    * Get businesses
//    */
//   //   protected async getAllBusinesses() {
//   //     try {
//   //       console.log("trying to get all from service..");

//   //       await connectToDatabase();

//   //       return this.businesses.find();
//   //     } catch (error) {
//   //       console.log("Business Service Error: ", error);
//   //     }
//   //   }

//   // /**
//   //  * Update a business by id
//   //  * @param _id
//   //  * @param update
//   //  */
//   // protected updateBusiness(_id: number, update: object) {
//   //   return this.businesses.findOneAndUpdate(
//   //     { _id },
//   //     { $set: update },
//   //     { new: true }
//   //   );
//   // }

//   // /**
//   //  * Query business by id
//   //  * @param _id
//   //  */
//   // protected getOneBusinessById(_id: string) {
//   //   return this.businesses.findOne({ _id });
//   // }

//   // /**
//   //  * Delete business by id
//   //  * @param id
//   //  */
//   // protected deleteOneBusinessById(_id: string) {
//   //   return this.businesses.deleteOne({ _id });
//   // }
// }
