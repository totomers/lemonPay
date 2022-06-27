import { connectToDatabase } from 'src/database/db';
import { Business } from 'src/database/models/business';
import { IBusinessDocument } from 'src/types/business.interface';
import { MongoCustomError } from 'src/utils/customError';

export async function markReferredAsRewarded(params: {
  _id: string;
}): Promise<IBusinessDocument> {
  try {
    await connectToDatabase();
    const { _id } = params;
    const updatedBusiness = await Business.findByIdAndUpdate(
      _id,
      {},
      { new: true }
    )
      .populate('rootUser')
      .exec();

    return updatedBusiness;
  } catch (err) {
    throw new MongoCustomError(err);
  }
}
