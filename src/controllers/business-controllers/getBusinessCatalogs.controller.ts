import { Context } from 'aws-lambda';
import { BusinessService } from 'src/services/business-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';


/**
 * =======================================================================================================
 * Get business catalogs list
 * =======================================================================================================
 */
export async function getBusinessCatalogs(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const data = await BusinessService.getBusinessCatalogsHandler();
    return { data };
  } catch (err) {
    console.log('error:', err);
    return { err };
  }
}
