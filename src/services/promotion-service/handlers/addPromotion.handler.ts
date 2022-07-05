import { connectToDatabase } from 'src/database/db';
import { Invitation } from 'src/database/models/invitation';
import { Promotion } from 'src/database/models/promotion';
import { PromoTypes } from 'src/types/promotion.interface';
import { CustomError, MongoCustomError } from 'src/utils/Errors';

export async function addPromotionHandler(params: {
  businessId: string;
  type: PromoTypes;
  businessReferred?: string;
  referredBy?: string;
}): Promise<{}> {
  try {
    await connectToDatabase();
    const { businessId, type, businessReferred, referredBy } = params;

    const result = await Promotion.create({
      businessId,
      type,
      businessReferred,
      referredBy,
    });

    return result;
  } catch (err) {
    console.log(err);
    throw new MongoCustomError(err);
  }
}
