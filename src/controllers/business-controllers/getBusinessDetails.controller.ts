import { Context } from 'aws-lambda';
import { BusinessService } from 'src/services/business-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/customError';

/**
 * =======================================================================================================
 * Get business details
 * =======================================================================================================
 */
export async function getBusinessDetails(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const _id = event.pathParameters._id;
    if (!_id) throw new MissingParamsError('_id');
    const data = await BusinessService.getBusinessDetailsHandler({ _id });
    return { data };
  } catch (err) {
    console.log('error:', err);
    return { err };
  }
}
