import { Context } from 'aws-lambda';
import { BusinessService } from 'src/services/business-service';
import { IClaimsIdToken } from 'src/types/claimsIdToken.interface';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/Errors';
import { checkIfLemonPayAdmin } from 'src/utils/validators/validate-if-lemonpay-admin';

/**
 * =======================================================================================================
 * Approve business
 * =======================================================================================================
 */
export async function approveBusiness(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    checkIfLemonPayAdmin(event);
    const { _id, merchantId, email } = event?.body;
    if (!_id || !merchantId || !email)
      throw new MissingParamsError('_id, merchantId, email');
    const data = await BusinessService.approveBusinessHandler({
      _id,
      merchantId,
      email,
    });
    return { data };
  } catch (err) {
    console.log('error:', err);
    return { err };
  }
}
