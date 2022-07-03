import { connectToDatabase } from 'src/database/db';
import { IBusinessDocument } from 'src/types/business.interface';
import { IUserDocument } from 'src/types/user.interface';
import { CustomError, MongoCustomError } from 'src/utils/customError';
import mongoose from 'mongoose';

import { Business } from 'src/database/models/business';
import { generateRefCode } from 'src/services/business-service/utils/referralCodeGen';
import { randomIntFromInterval } from 'src/utils/tests/randomIntFromInterval';
import { User } from 'src/database/models/user';
import { IPromotionDocument } from 'src/types/promotion.interface';
import { Promotion } from 'src/database/models/promotion';
/**
 * ====================================================================================================
 * Create new mock businesses and admins with referral codes
 * @param params
 * ====================================================================================================
 */

export async function createMockBusinessAccounts(params: {
  emailNameList: { email: string; name: string }[];
}): Promise<any> {
  try {
    await connectToDatabase();
    const { emailNameList } = params;

    await _erasePreviousMockAdminsAndBusinesses(emailNameList);

    const adminsList = emailNameList.map((i) => ({
      email: i.email,
      name: i.name,
      dateofbirth: '1990-12-12',
      homeAddress: 'Blueway Street',
      homeHouseNumber: '44',
      homeZipCode: '232452',
      _id: new mongoose.Types.ObjectId(),
    }));

    const businessesList = adminsList.reduce((prev, a, index) => {
      const newBusiness = {
        _id: new mongoose.Types.ObjectId(),
        rootUser: a._id,
        businessName: `${a.name}'s Business`,
        businessTradeName: `${a.name}'s Business`,
        businessType: 'CommercialPartnership',
        industry: 'KitchenTools',
        referralCode: generateRefCode(),
        referrerCode:
          index !== 0 &&
          (prev[randomIntFromInterval(0, index - 1)] as IBusinessDocument)
            .referralCode,
        wasReferredAndRedeemed: false,
        businessAddress: 'RedWay Drive',
        businessHouseNumber: '13',
        businessZipCode: '39232',
        businessRegistrationNumber: '123456789',
        bankAccountHolderName: a.name,
        bankAccountIban: randomIntFromInterval(1000000, 10000000),
        bankAccountSwift: '4234234234234',
        status: [
          'verified',
          'pendingAction',
          'pendingVerification',
          'unverified',
        ][randomIntFromInterval(0, 3)],
      };

      return prev.concat(newBusiness);
    }, []);

    const businessesListWithReferred = businessesList.map(
      (b: IBusinessDocument) => {
        const businessesReferred = businessesList
          .filter((c: IBusinessDocument) => c.referrerCode === b.referralCode)
          .map((r: IBusinessDocument) => ({
            business: r._id,
            wasReferrerRedeemed: false,
          }));

        return { ...b, businessesReferred };
      }
    );

    let promotions = [];
    businessesList.forEach((b: IBusinessDocument) => {
      if (b.referrerCode)
        promotions.push({
          businessId: b._id,
          type: 'referredByBusiness',
          referredBy: b.referrerCode,
          status: 'open',
        } as Partial<IPromotionDocument>);
      businessesList.forEach((c: IBusinessDocument) => {
        if (b.referralCode === c.referrerCode)
          promotions.push({
            businessId: b._id,
            type: 'referredABusiness',
            businessReferred: c._id,
            status: 'open',
          } as Partial<IPromotionDocument>);
      });
    });

    console.log(promotions, 'promotions');

    const newMockBusinesses = await Business.collection.insertMany(
      businessesListWithReferred
    );

    const newMockPromotions = await Promotion.collection.insertMany(promotions);

    const adminsListWithBusinesses = adminsList.map((a) => {
      const businessOfRootUser = businessesList.find(
        (b: IBusinessDocument) => b.rootUser === a._id
      );
      const businesses = [{ business: businessOfRootUser._id, role: 'ROOT' }];

      return { ...a, businesses };
    });
    const newMockAdmins = await User.collection.insertMany(
      adminsListWithBusinesses
    );

    return { businesses: newMockBusinesses, admins: newMockAdmins };
  } catch (err) {
    throw new MongoCustomError(err);
  }
}

async function _erasePreviousMockAdminsAndBusinesses(
  emailNameList: { email: string; name: string }[]
) {
  try {
    const emails = emailNameList.map((i) => i.email);
    const mockAdmins = await User.find({ email: { $in: emails } });
    const mockAdminsIdList = mockAdmins.map((a) => a._id);
    await User.collection.deleteMany({ _id: { $in: mockAdminsIdList } });
    await Business.collection.deleteMany({
      businessAdmin: { $in: mockAdminsIdList },
    });
  } catch (error) {
    throw new MongoCustomError(error);
  }
}
