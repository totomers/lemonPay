import { Context } from 'aws-lambda';
import { BusinessService } from 'src/services/business-service';
import { IBusinessDocument } from 'src/types/business.interface';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/customError';

/**
 * =======================================================================================================
 * Create business
 * =======================================================================================================
 */
export async function create(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const params: Partial<IBusinessDocument> = event?.body;
    const data = await BusinessService.createBusinessHandler(params);
    return { data };
  } catch (err) {
    console.log('error:', err);
    return { err };
  }
}
