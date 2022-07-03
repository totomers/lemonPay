import { Promotion } from 'src/database/models/promotion';
import { MongoCustomError } from 'src/utils/customError';
import { IPromotionDocument } from 'src/types/promotion.interface';

export async function updatePromotionsStatusHandler(params: {
  promotionIds: string[];
  status: 'pending' | 'closed';
}) {
  try {
    const { promotionIds, status } = params;
    const promotions = await Promotion.findOneAndUpdate(
      { _id: { $in: promotionIds } },
      { status },
      { new: true }
    );

    if (status === 'closed') {
      // await _emailBusinessesTransferStatus(promotions);
    }

    return;
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
