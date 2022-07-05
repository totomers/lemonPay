import { Promotion } from 'src/database/models/promotion';
import { MongoCustomError } from 'src/utils/Errors';

export async function markPromotionAsPendingHandler(params: {
  promotionIds: string[];
}) {
  try {
    const { promotionIds } = params;
    const result = await Promotion.findOneAndUpdate(
      { _id: { $in: promotionIds } },
      { status: 'pending' },
      { new: true }
    );

    return result;
  } catch (error) {
    throw new MongoCustomError(error);
  }
}
