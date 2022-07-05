import { Context } from 'aws-lambda';
import { BusinessService } from 'src/services/business-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/Errors';

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
    const { businessId, code } = event.body;
    if (!businessId || !code) throw new MissingParamsError('businessId, code');

    const data = await BusinessService.addReferrerToBusinesssHandler({
      businessId,
      referralCode: code,
    });

    return { data };
  } catch (err) {
    return { err };
  }
}
