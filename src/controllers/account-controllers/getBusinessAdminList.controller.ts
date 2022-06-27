import { Context } from 'aws-lambda';
import { AccountService } from 'src/services/account-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';

/**
 * =======================================================================================================
 * Get List Of All Business Owners
 * =======================================================================================================
 */
export async function getBusinessAdminList(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const data = await AccountService.getBusinessAdminListHandler();
    return { data };
  } catch (err) {
    return { err };
  }
}
