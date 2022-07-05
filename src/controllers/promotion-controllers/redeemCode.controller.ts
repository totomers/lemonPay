import { Context } from 'aws-lambda';
import { BusinessService } from 'src/services/business-service';
import { PromotionService } from 'src/services/promotion-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/Errors';

/**
 * =======================================================================================================
 * Redeem Code
 * =======================================================================================================
 */
export async function redeemCode(
  event: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const { businessId, code } = event.body;
    if (!businessId || !code) throw new MissingParamsError('businessId, code');

    const data = await PromotionService.redeemCodeHandler({
      businessId,
      code,
    });

    return { data };
  } catch (err) {
    return { err };
  }
}
