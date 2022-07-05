import { connectToDatabase } from 'src/database/db';
import { Business } from 'src/database/models/business';
import { CustomError, MongoCustomError } from 'src/utils/Errors';
import { WaitListBusiness } from 'src/database/models/waitlistBusiness';
import { addReferralPromotionHandler } from './addReferralPromotion.handler';
/**
 * ====================================================================================================
 * Redeem Code
 * @param params
 * ====================================================================================================
 */

export async function redeemCodeHandler(params: {
  businessId: string;
  code: string;
}): Promise<{}> {
  try {
    await connectToDatabase();

    const { businessId, code } = params;

    //check if code validity and promotion type
    const promotionType = await _getPromotionType(code);

    switch (promotionType) {
      case 'referredByBusiness':
        await addReferralPromotionHandler({
          businessId,
          referralCode: code,
        });
        return { promoType: 'referredByBusiness' };

      case 'referredByWaitlistBusiness':
        await addReferralPromotionHandler({
          businessId,
          referralCode: code,
          isWaitlistReferrer: true,
        });
        return { promoType: 'referredByBusiness' };
      default:
        throw new CustomError('Code is invalid', 400, 'InvalidCodeException');
    }
  } catch (err) {
    throw new MongoCustomError(err);
  }
}

async function _getPromotionType(
  code: string
): Promise<'referredByBusiness' | 'referredByWaitlistBusiness' | null> {
  if (await _isReferredByBusinessType(code)) return 'referredByBusiness';
  if (await _isReferredByWaitlistBusinessType(code))
    return 'referredByWaitlistBusiness';
}

async function _isReferredByBusinessType(code) {
  try {
    const businessWithReferral = await Business.findOne({ referralCode: code });
    if (businessWithReferral?._id) return true;
  } catch (err) {
    throw new MongoCustomError(err);
  }
}
async function _isReferredByWaitlistBusinessType(code) {
  try {
    const waitlistBusinessWithReferral = await WaitListBusiness.findOne({
      referralCode: code,
    });
    if (waitlistBusinessWithReferral?._id) return true;
  } catch (err) {
    throw new MongoCustomError(err);
  }
}
