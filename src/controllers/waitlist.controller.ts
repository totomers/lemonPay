import { Context } from 'aws-lambda';
import { MissingParamsError } from 'src/utils/customError';
import { WaitlistService } from 'src/services/waitlist-service';
/**
 * =======================================================================================================
 * Add waitlist to db
 * =======================================================================================================
 */
export async function addBusinesses(event?: any, context?: Context) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const data = await WaitlistService.createWaitlistBusinesses();
    return { data };
  } catch (err) {
    return { err };
  }
}

export const WaitlistController = {
  addBusinesses,
};
