import { Context } from 'aws-lambda';
import { WaitlistService } from 'src/services/waitlist-service';
/**
 * =======================================================================================================
 * Add waitlist to db
 * =======================================================================================================
 */
export async function addWaitlistBusinesses(event?: any, context?: Context) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const data = await WaitlistService.createWaitlistBusinesses();
    return { data };
  } catch (err) {
    return { err };
  }
}
