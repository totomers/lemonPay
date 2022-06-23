import { connectToDatabase } from 'src/database/db';
import { Business } from 'src/database/models/business';
import { IBusinessDocument } from 'src/types/business.interface';
import { CustomError, MongoCustomError } from 'src/utils/customError';
import { WaitListBusiness } from 'src/database/models/waitlistBusiness';
/**
 * ====================================================================================================
 * Add referrer to business
 * @param params
 * ====================================================================================================
 */

export async function addReferrerToBusinesssHandler(params: {
  businessId: string;
  referralCode: string;
}): Promise<{ updatedBusiness: IBusinessDocument } | CustomError> {
  try {
    await connectToDatabase();

    const { businessId, referralCode } = params;

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
        'ReferralCodeMismatchException'
      );

    if (registeredReferrer._id)
      _inhibitSelfReferring(registeredReferrer?._id, businessId);

    //update referredBusiness
    const updatedBusiness = await Business.findOneAndUpdate(
      { businessId },
      {
        referrerCode: referralCode,
      }
    );

    //update referringBusiness if he registered
    if (registeredReferrer?._id)
      await Business.findByIdAndUpdate(registeredReferrer._id, {
        $addToSet: {
          businessesReferred: { business: businessId, wasReedemed: false },
        },
      });

    return { updatedBusiness };
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
        'ReferralCodeMismatchException'
      );
  } catch (error) {
    throw error;
  }
}
