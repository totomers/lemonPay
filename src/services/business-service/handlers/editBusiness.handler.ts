import { connectToDatabase } from 'src/database/db';
import { Business } from 'src/database/models/business';
import { AccountService } from 'src/services/account-service';
import { IBusinessDocument } from 'src/types/business.interface';
import { AdminOnlyError, MongoCustomError } from 'src/utils/customError';

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
