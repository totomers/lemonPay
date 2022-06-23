import { connectToDatabase } from 'src/database/db';
import { IBusinessDocument } from 'src/types/business.interface';
import { IUserDocument } from 'src/types/user.interface';
import { CustomError, MongoCustomError } from 'src/utils/customError';
import { BusinessService } from '../../business-service';
import { AccountService } from '..';
import { CognitoService } from 'src/services/cognito-service';
import mongoose from 'mongoose';
import { WaitListBusiness } from 'src/database/models/waitlistBusiness';
import { Business } from 'src/database/models/business';
import { IPhosOnboardingRequest } from 'src/types/phosOnboardingRequest.interface';
import { IPhosOnboardingResponse } from 'src/types/phosOnboardingResponse.interface';
import axios from 'axios';
/**
 * ====================================================================================================
 * Create new user
 * @param params
 * ====================================================================================================
 */

export async function createBusinessAccountHandler(params: {
  user: Partial<IUserDocument>;
  business: Partial<IBusinessDocument>;
}): Promise<Partial<IUserDocument>> {
  try {
    await connectToDatabase();

    const { user, business } = params;
    const newUserId = new mongoose.Types.ObjectId();

    const waitListBusiness = await WaitListBusiness.findOne({
      email: user.email,
    });

    const waitListReferralCode = waitListBusiness?.referralCode;
    const businessesRegisteredWithRefCode = await _getReferredBusinesses(
      waitListReferralCode
    );

    const newBusiness = await BusinessService.createBusinessHandler({
      ...business,
      businessAdmin: newUserId,
      referralCode: waitListReferralCode ? waitListReferralCode : null,
      businessesReferred: businessesRegisteredWithRefCode,
    });

    const newUser = await AccountService.createAdminUserHandler({
      user: { ...user, _id: newUserId },
      business: newBusiness,
    });
    console.log('newUser', newUser);

    await CognitoService.updateUserAttributes({
      email: user.email,
      attributes: [{ Name: 'custom:isKnownDetails', Value: '1' }],
    });

    return newUser;
  } catch (err) {
    throw new MongoCustomError(err);
  }
}

async function _getReferredBusinesses(referralCode: string) {
  const businesses = await Business.find({ referrerCode: referralCode });
  if (businesses.length > 0)
    businesses.map((b) => ({ business: b._id, wasRedeemed: false }));
  return businesses as { business: string; wasRedeemed: boolean }[] | null;
}
async function createMerchantAccount(
  props: IPhosOnboardingRequest
): Promise<IPhosOnboardingResponse> {
  try {
    const apiKey = '';
    const apiSecret = '';
    const content = '';

    const ts = Math.floor(Date.now() / 1000);

    // const hash = CryptoJS.HmacSHA256(
    //   apiKey +
    //     ts +
    //     'https://external.integration.phos.dev/api/v1/account/onboarding' +
    //     content,
    //   apiSecret
    // ).toString();
    const result = await axios.post<IPhosOnboardingResponse>(
      'https://external.integration.phos.dev/api/v1/create-single-merchant-user',
      props,
      {
        headers: {
          'x-api-key': apiKey,
          'x-api-request-date': ts,
          'x-api-hash': '',
        },
      }
    );

    return result.data;
  } catch (err) {
    throw err;
  }
}
