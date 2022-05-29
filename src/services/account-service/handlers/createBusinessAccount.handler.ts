import { connectToDatabase } from 'src/database/db';
import { IBusinessDocument } from 'src/types/business.interface';
import { IUserDocument } from 'src/types/user.interface';
import { CustomError, MongoCustomError } from 'src/utils/customError';
import { BusinessService } from '../../business-service';
import { AccountService } from '..';
import { CognitoService } from 'src/services/cognito-service';
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
    const { user, business } = params;

    const newBusiness = await BusinessService.createBusinessHandler(business);

    // Check If User with the same email exists

    const newUser = await AccountService.createAdminUserHandler({
      user,
      business: newBusiness,
    });

    await CognitoService.updateUserAttributes({
      email: user.email,
      attributes: [{ Name: 'custom:isKnownDetails', Value: '1' }],
    });
    const { _id, name, email, businesses } = newUser;
    const returnedUser = { _id, name, email, businesses };
    return returnedUser;
  } catch (err) {
    throw new MongoCustomError(err);
  }
}
