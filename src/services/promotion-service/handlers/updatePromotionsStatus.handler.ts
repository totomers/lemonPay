import { Promotion } from 'src/database/models/promotion';
import { MongoCustomError } from 'src/utils/Errors';
import { IPromotionDocument } from 'src/types/promotion.interface';
import { connectToDatabase } from 'src/database/db';

export async function updatePromotionsStatusHandler(params: {
  promotionIds: string[];
  status: 'pending' | 'closed';
}) {
  try {
    await connectToDatabase();
    const { promotionIds, status } = params;
    const promotions = await Promotion.updateMany(
      { _id: { $in: promotionIds } },
      { status },
      { new: true }
    );
    console.log(promotions);

    if (status === 'closed') {
      // await _emailBusinessesTransferStatus(promotions);
    }

    return promotions;
  } catch (error) {
    throw new MongoCustomError(error);
  }
}

async function emailBusinessesTransferStatus(promotions: IPromotionDocument) {
  // GET EMAILS OF BUSINESSES
  const populatedPromotions = (
    await promotions.populate('businessId')
  ).populate('businessId.rootUser');

  console.log('a populated promotion', populatedPromotions[0]);

  // SEND EMAILS TO ALL BUSINESSES ROOT USERS

  const text = '';
  const html = '';
  const subject = 'Referral Promotion Received ';
}
