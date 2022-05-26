import { connectToDatabase } from 'src/database/db';
import { IBusinessDocument } from 'src/types/business.interface';
import { IUserDocument } from 'src/types/user.interface';
import { CustomError, MongoCustomError } from 'src/utils/customError';
import { BusinessService } from '../business.service';

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
