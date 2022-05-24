import { IBusinessDocument } from 'src/types/business.interface';
import { connectToDatabase } from 'src/database/db';
import { Business } from '../database/models/business';
import {
  AdminOnlyError,
  CustomError,
  MongoCustomError,
} from 'src/utils/customError';
import { AccountService } from './account.service';

export async function getAllBusinessesHandler() {
  try {
    await connectToDatabase();
    return Business.find();
  } catch (error) {
    return error;
  }
}

export async function createBusinessHandler(
  params: Partial<IBusinessDocument>
): Promise<IBusinessDocument> {
  try {
    await connectToDatabase();
    const { businessRegistrationNumber } = params;
    await validateBusinessDetails({ businessRegistrationNumber });
    const result = await Business.create(params);

    return result;
  } catch (err) {
    console.log(err);

    throw new MongoCustomError(err);
  }
}
async function validateBusinessDetails(params: {
  businessRegistrationNumber: string;
}) {
  try {
    const { businessRegistrationNumber } = params;
    // Check if business is already in our DB  מספר ח.פ. או מספר עוסק מורשה
    const result = await Business.findOne({ businessRegistrationNumber });
    if (result?._id)
      throw new CustomError(
        'Business registration number belongs to a pre-exisiting company',
        400,
        'BusinessExistsException',
        'BusinessExistsException'
      );
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function editBusinessHandler(params: {
  edittedBusiness: Partial<IBusinessDocument>;
  email: string;
}): Promise<IBusinessDocument> {
  try {
    await connectToDatabase();
    const { email, edittedBusiness } = params;
    const isBusinessAdmin = await AccountService.isUserABusinessAdmin({
      email,
      businessId: edittedBusiness._id,
    });

    if (!isBusinessAdmin) throw new AdminOnlyError();
    const result = await Business.findByIdAndUpdate(edittedBusiness._id, {
      edittedBusiness,
    });

    return result;
  } catch (err) {
    if (err instanceof AdminOnlyError) throw err;
    else throw new MongoCustomError(err);
  }
}

export const BusinessService = {
  getAllBusinessesHandler,
  createBusinessHandler,
};
