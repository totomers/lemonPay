import { connectToDatabase } from 'src/database/db';
import { User } from 'src/database/models/user';
import { PipedriveService } from 'src/services/pipedrive-service';
import { AddToPipedriveRequest } from 'src/services/pipedrive-service/handlers/addToPipedrive.handler';
import { IBusinessDocument } from 'src/types/business.interface';
import { IUserDocument } from 'src/types/user.interface';
import { MongoCustomError } from 'src/utils/Errors';

/**
 * ====================================================================================================
 * Create Root User
 * @param params
 * ====================================================================================================
 */
export async function createBusinessRootUserHandler(params: {
  user: Partial<IUserDocument>;
  business: Partial<IBusinessDocument>;
}): Promise<{
  _id: string;
  email: string;
  name: string;
  businesses: any;
}> {
  try {
    await connectToDatabase();
    const { user, business } = params;

    const newUser = (await User.create({
      ...user,
      businesses: [{ business: business._id, role: 'ROOT' }],
    })) as IUserDocument;

    const rootUsersBusiness = {
      business: {
        _id: business._id,
        businessName: business.businessName,
        status: business.status,
        referralCode: business.referralCode,
      },
      role: 'ROOT',
    };

    const newAdminUser = {
      _id: newUser._id,
      email: newUser.email,
      name: user.name,
      businesses: [rootUsersBusiness],
    };

    // await _addUserToPipeDrive({
    //   name: user.name,
    //   email: user.email,
    //   promoCode: business.referralCode,
    // });
    return newAdminUser;
  } catch (err) {
    throw new MongoCustomError(err);
  }
}

async function _addUserToPipeDrive(props: AddToPipedriveRequest) {
  const { name, email, promoCode } = props;
  await PipedriveService.addToPipedriveHandler({ name, email, promoCode });
}
