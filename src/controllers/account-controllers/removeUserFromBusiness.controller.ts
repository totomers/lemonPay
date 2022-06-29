import { Context } from 'aws-lambda';
import { AccountService } from 'src/services/account-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/customError';
import { checkIfAdmin } from 'src/utils/validators/validate-if-admin';

/**
 * =======================================================================================================
 * Remove User From Business
 * =======================================================================================================
 */
export async function removeUserFromBusiness(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    // checkIfAdmin(event);
    const { userId, businessId } = event.body;
    if (!userId || !businessId)
      throw new MissingParamsError('userId, businessId');
    const data = await AccountService.removeUserFromBusinessHandler({
      userId,
      businessId,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
