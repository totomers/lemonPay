import { connectToDatabase } from 'src/database/db';
import { User } from 'src/database/models/user';
import { IUserDocument } from 'src/types/user.interface';
import { MongoCustomError } from 'src/utils/Errors';
import { Catalog } from 'src/database/models/catalog';
import { IBusinessDocument } from 'src/types/business.interface';

/**
 * ====================================================================================================
 * Get User
 * @param params
 * ====================================================================================================
 */
export async function getUserHandler(params: { email: string }) {
  try {
    await connectToDatabase();

    const { email = 'tomere@moveo.co.il' } = params;
    const user = (await User.findOne({ email })
      .select({ _id: 1, name: 1, email: 1 })
      .populate({
        path: 'businesses',
        populate: {
          path: 'business',
          model: 'business',
          select: { businessName: 1, status: 1, referralCode: 1, catalog: 1 },
        },
      })
      .exec()) as IUserDocument;

    const catalogId = (user.businesses[0].business as any).catalog;
    if (catalogId) {
      const catalog = await Catalog.findById(catalogId);
      (user.businesses[0].business as any).catalog = catalog;
    }

    return user;
  } catch (err) {
    throw new MongoCustomError(err);
  }
}
