import { APIGatewayProxyResult } from 'aws-lambda';
import { PromotionsController } from 'src/controllers/promotion-controllers/_index';
import { formatErrorResponse, formatJSONResponse } from 'src/utils/api-gateway';
import { middyfy } from 'src/utils/lambda';

export const redeemCode = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const result = await PromotionsController.redeemCode(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);

export const updatePromotionsStatus = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const result = await PromotionsController.updatePromotionsStatus(
      event,
      context
    );
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
