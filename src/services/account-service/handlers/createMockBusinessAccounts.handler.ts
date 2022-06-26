import { connectToDatabase } from 'src/database/db';
import { IBusinessDocument } from 'src/types/business.interface';
import { IUserDocument } from 'src/types/user.interface';
import { CustomError, MongoCustomError } from 'src/utils/customError';
import mongoose from 'mongoose';

import { Business } from 'src/database/models/business';
import { generateRefCode } from 'src/services/business-service/utils/referralCodeGen';
import { randomIntFromInterval } from 'src/utils/tests/randomIntFromInterval';
import { User } from 'src/database/models/user';
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
        businessAdmin: a._id,
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
          'declined',
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

    const newMockBusinesses = await Business.collection.insertMany(
      businessesListWithReferred
    );

    const adminsListWithBusinesses = adminsList.map((a) => {
      const businessOfAdmin = businessesList.find(
        (b: IBusinessDocument) => b.businessAdmin === a._id
      );
      const businesses = [{ business: businessOfAdmin._id, role: 'ADMIN' }];

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
