import { Context } from 'aws-lambda';
import { BusinessService } from 'src/services/business-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/customError';

/**
 * =======================================================================================================
 * Add Referrer To Business
 * =======================================================================================================
 */
export async function addReferrerToBusiness(
  event: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const { businessId, referralCode } = event.body;
    if (!businessId || !referralCode)
      throw new MissingParamsError('businessId, referralCode');

    const data = await BusinessService.addReferrerToBusinesssHandler({
      businessId,
      referralCode,
    });

    return { data };
  } catch (err) {
    return { err };
  }
}
