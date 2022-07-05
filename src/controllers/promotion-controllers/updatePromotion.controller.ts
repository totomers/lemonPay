import { Context } from 'aws-lambda';
import { PromotionService } from 'src/services/promotion-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/Errors';

/**
 * =======================================================================================================
 * Update Promotions Status
 * =======================================================================================================
 */
export async function updatePromotionsStatus(
  event: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const { promotionIds, status } = event.body;
    if (!promotionIds || !status)
      throw new MissingParamsError('promotionIds, status');

    const data = await PromotionService.updatePromotionsStatusHandler({
      promotionIds,
      status,
    });

    return { data };
  } catch (err) {
    return { err };
  }
}
