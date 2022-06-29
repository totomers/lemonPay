import { Context } from 'aws-lambda';
import { BusinessService } from 'src/services/business-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { checkIfLemonPayAdmin } from 'src/utils/validators/validate-if-lemonpay-admin';
/**
 * =======================================================================================================
 * Get business list
 * =======================================================================================================
 */
export async function getAll(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    checkIfLemonPayAdmin(event);
    const data = await BusinessService.getAllBusinessesHandler();
    return { data };
  } catch (err) {
    console.log('error:', err);
    return { err };
  }
}
