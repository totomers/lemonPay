import { CONFIG } from 'src/config';
import { Business } from 'src/database/models/business';
import { Transaction } from 'src/database/models/transaction';
import { CustomError, MongoCustomError } from 'src/utils/Errors';
import { PromotionService } from '..';

export async function addReferralPromotionHandler(params: {
  businessId: string;
  referralCode: string;
  isWaitlistReferrer?: boolean;
}) {
  try {
    const { businessId, referralCode, isWaitlistReferrer } = params;
    await _blockIfBusinessHasTransactions(businessId);

    await _handleReferred({ businessId, referralCode });
    if (!isWaitlistReferrer)
      await _handleReferrer({ businessId, referralCode });
  } catch (error) {
    throw new MongoCustomError(error);
  }
}

async function _handleReferred(params: {
  businessId: string;
  referralCode: string;
}) {
  const { businessId, referralCode } = params;

  const business = await Business.findById(businessId);

  if (business.referrerCode)
    throw new CustomError(
      'Promotion was already used',
      400,
      'UsedPromotionException'
    );

  business.referrerCode = referralCode;
  await business.save();

  await PromotionService.addPromotionHandler({
    businessId,
    type: CONFIG.PROMOTION_TYPES.REFERRED_BY_BUSINESS,
    referredBy: referralCode,
  });
}
async function _handleReferrer(params: {
  businessId: string;
  referralCode: string;
}) {
  const { businessId, referralCode } = params;

  const referrerBusiness = await Business.findOne({ referralCode });

  await PromotionService.addPromotionHandler({
    businessId: referrerBusiness?._id,
    type: CONFIG.PROMOTION_TYPES.REFERRED_A_BUSINESS,
    businessReferred: businessId,
  });
}

async function _blockIfBusinessHasTransactions(businessId: string) {
  try {
    const transaction = await Transaction.find({ businessId });

    if (transaction.length > 0)
      throw new CustomError(
        'Business is not eligible to redeem code.',
        400,
        'NotEligibleException'
      );
  } catch (error) {
    throw error;
  }
}
