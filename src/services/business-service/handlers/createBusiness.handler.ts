import { connectToDatabase } from 'src/database/db';
import { Business } from 'src/database/models/business';
import { generateRefCode } from '../utils/referralCodeGen';
import { IBusinessDocument } from 'src/types/business.interface';
import { CustomError, MongoCustomError } from 'src/utils/Errors';

export async function createBusinessHandler(
  params: Partial<IBusinessDocument>
): Promise<IBusinessDocument> {
  try {
    await connectToDatabase();
    const { referralCode } = params;
    // await _validateBusinessDetails({ businessRegistrationNumber });   TBD: Guy needs to decide if he wants this validation

    const result = await Business.create({
      ...params,
      referralCode: referralCode ? referralCode : generateRefCode(),
    });

    return result;
  } catch (err) {
    console.log(err);
    throw new MongoCustomError(err);
  }
}

async function _getBusinessRefCode(): Promise<string> {
  try {
    // check if this business admin already has referral code in the waitinglist collection

    const referralCode = generateRefCode();
    const businessFound = await Business.findOne({ referralCode });
    if (businessFound?._id) await _getBusinessRefCode();
    return referralCode;
  } catch (err) {
    throw new MongoCustomError(err);
  }
}

async function _validateBusinessDetails(params: {
  businessRegistrationNumber: string;
}) {
  try {
    const { businessRegistrationNumber } = params;
    // Check if business is already in our DB  מספר ח.פ. או מספר עוסק מורשה
    const result = await Business.findOne({ businessRegistrationNumber });
    if (result?._id)
      throw new CustomError(
        'Business registration number belongs to a pre-exisiting company',
        400,
        'BusinessExistsException',
        'BusinessExistsException'
      );
  } catch (err) {
    console.error(err);
    throw err;
  }
}
