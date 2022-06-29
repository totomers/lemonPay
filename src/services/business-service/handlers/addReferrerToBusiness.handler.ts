import { connectToDatabase } from 'src/database/db';
import { Business } from 'src/database/models/business';
import { IBusinessDocument } from 'src/types/business.interface';
import { CustomError, MongoCustomError } from 'src/utils/customError';
import { WaitListBusiness } from 'src/database/models/waitlistBusiness';
import { Transaction } from 'src/database/models/transaction';
/**
 * ====================================================================================================
 * Add referrer to business
 * @param params
 * ====================================================================================================
 */

export async function addReferrerToBusinesssHandler(params: {
  businessId: string;
  referralCode: string;
}): Promise<{}> {
  try {
    await connectToDatabase();

    const { businessId, referralCode } = params;

    await _inhibitIfBusinessTransactionOccured(businessId);

    const registeredReferrer = (await Business.findOne({
      referralCode,
    })) as IBusinessDocument;

    const waitingListReferrer = !registeredReferrer._id
      ? await _getBusinessFromWaitingList(referralCode)
      : null;

    if (!registeredReferrer?._id && !waitingListReferrer?._id)
      throw new CustomError(
        'No business found with the given referral code',
        400,
        'InvalidCodeException'
      );

    if (registeredReferrer._id)
      _inhibitSelfReferring(registeredReferrer?._id, businessId);

    //update referredBusiness
    const updatedBusiness = await Business.findOneAndUpdate(
      { businessId },
      {
        referrerCode: referralCode,
      },
      { new: true }
    );

    //update referringBusiness if he registered
    if (registeredReferrer?._id)
      await Business.findByIdAndUpdate(registeredReferrer._id, {
        $addToSet: {
          businessesReferred: { business: businessId, wasReedemed: false },
        },
      });

    return {};
  } catch (err) {
    throw new MongoCustomError(err);
  }
}

async function _getBusinessFromWaitingList(referralCode: string): Promise<{
  _id: string;
} | null> {
  try {
    const waitingListBusiness = await WaitListBusiness.findOne({
      referralCode,
    });
    return waitingListBusiness;
  } catch (err) {
    throw new MongoCustomError(err);
  }
}

function _inhibitSelfReferring(
  refferingBusinessId: string,
  refferedBusinessId: string
) {
  try {
    if (refferingBusinessId === refferedBusinessId)
      throw new CustomError(
        'Self Referring Is Not Valid',
        400,
        'InvalidCodeException'
      );
  } catch (error) {
    throw error;
  }
}

async function _inhibitIfBusinessTransactionOccured(businessId: string) {
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
