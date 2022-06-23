import { connectToDatabase } from 'src/database/db';
import { WaitListBusiness } from 'src/database/models/waitlistBusiness';
import { MongoCustomError } from 'src/utils/customError';
import { waitlingList } from 'src/temp/waitingListData';
import { waitlingListMock } from 'src/temp/waitingListDataMock';
import { IWaitListBusinessDocument } from 'src/types/waitingListBusiness.interface';
/**
 * ====================================================================================================
 * Create Waitlist Businesses
 * ====================================================================================================
 */
export async function createWaitlistBusinesses(): Promise<any> {
  try {
    await connectToDatabase();

    const waitListBusinesses = await WaitListBusiness.collection.insertMany(
      waitlingListMock
    );

    console.log('waitListBusinesses', waitListBusinesses);

    return waitListBusinesses;
  } catch (err) {
    throw new MongoCustomError(err);
  }
}
