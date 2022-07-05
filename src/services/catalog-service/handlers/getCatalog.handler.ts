import { connectToDatabase } from 'src/database/db';
import { Catalog } from 'src/database/models/catalog';
import { MongoCustomError } from 'src/utils/Errors';

/**
 * ====================================================================================================
 * Get Catalog
 * @param params
 * ====================================================================================================
 */
export async function getCatalogHandler(params: { _id: string }) {
  try {
    await connectToDatabase();

    const { _id } = params;
    const catalog = await Catalog.findById(_id);
    //   .select({ _id: 1, name: 1, email: 1 })
    //   .populate({
    //     path: 'businesses',
    //     populate: {
    //       path: 'business',
    //       model: 'business',
    //       select: { businessName: 1, status: 1, referralCode: 1 },
    //     },
    //   })
    //   .exec()) as IUserDocument;

    return catalog;
  } catch (err) {
    throw new MongoCustomError(err);
  }
}
