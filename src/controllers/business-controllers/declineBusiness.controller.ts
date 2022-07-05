import { Context } from 'aws-lambda';
import { BusinessService } from 'src/services/business-service';
import { IClaimsIdToken } from 'src/types/claimsIdToken.interface';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/Errors';
import { checkIfLemonPayAdmin } from 'src/utils/validators/validate-if-lemonpay-admin';
/**
 * =======================================================================================================
 * Decline business
 * =======================================================================================================
 */
export async function declineBusiness(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    checkIfLemonPayAdmin(event);
    const { _id, email } = event?.body;
    if (!_id || !email) throw new MissingParamsError('_id, email');
    const data = await BusinessService.declineBusinessHandler({
      _id,
      email,
    });
    return { data };
  } catch (err) {
    console.log('error:', err);
    return { err };
  }
}
