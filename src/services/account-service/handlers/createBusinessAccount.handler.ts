import { connectToDatabase } from 'src/database/db';
import { IBusinessDocument } from 'src/types/business.interface';
import { IUserDocument } from 'src/types/user.interface';
import { CustomError, MongoCustomError } from 'src/utils/customError';
import { BusinessService } from '../../business-service';
import { AccountService } from '..';
import { CognitoService } from 'src/services/cognito-service';
import mongoose from 'mongoose';
/**
 * ====================================================================================================
 * Create new user
 * @param params
 * ====================================================================================================
 */

export async function createBusinessAccountHandler(params: {
  user: Partial<IUserDocument>;
  business: Partial<IBusinessDocument>;
}): Promise<Partial<IUserDocument>> {
  try {
    await connectToDatabase();
    // const conn = mongoose.connection;
    // const session = await conn.startSession();
    // const user = await session.withTransaction(async () => {
    const { user, business } = params;
    const newUserId = new mongoose.Types.ObjectId();

    const newBusiness = await BusinessService.createBusinessHandler({
      ...business,
      businessAdmin: newUserId,
    });
    console.log('newBusiness', newBusiness);

    const newUser = await AccountService.createAdminUserHandler({
      user: { ...user, _id: newUserId },
      business: newBusiness,
    });
    console.log('newUser', newUser);

    //   return newUser;
    // });

    // await session.endSession();
    await CognitoService.updateUserAttributes({
      email: user.email,
      attributes: [{ Name: 'custom:isKnownDetails', Value: '1' }],
    });
    console.log('user returned', user);

    return newUser;
  } catch (err) {
    throw new MongoCustomError(err);
  }
}
