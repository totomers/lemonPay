import { connectToDatabase } from 'src/database/db';
import { Business } from 'src/database/models/business';
import { IBusinessDocument } from 'src/types/business.interface';
import { AdminOnlyError, MongoCustomError } from 'src/utils/customError';

export async function updateBusinessStatus(params: {
  _id: string;
  status: 'pendingVerification' | 'pendingAction';
}): Promise<IBusinessDocument> {
  try {
    await connectToDatabase();
    const { _id, status } = params;
    const updatedBusiness = await Business.findByIdAndUpdate(
      _id,
      {
        status,
      },
      { new: true }
    );

    return updatedBusiness;
  } catch (err) {
    if (err instanceof AdminOnlyError) throw err;
    else throw new MongoCustomError(err);
  }
}
