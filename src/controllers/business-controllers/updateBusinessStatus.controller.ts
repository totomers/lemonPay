import { Context } from 'aws-lambda';
import { BusinessService } from 'src/services/business-service';
import { IClaimsIdToken } from 'src/types/claimsIdToken.interface';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/Errors';
import { checkIfLemonPayAdmin } from 'src/utils/validators/validate-if-lemonpay-admin';

/**
 * =======================================================================================================
 * Update business status (pendingAction or pendingVerification)
 * =======================================================================================================
 */
export async function updateBusinessStatus(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    checkIfLemonPayAdmin(event);
    const { _id, status } = event?.body;
    if (!_id || !status) throw new MissingParamsError('_id, status');
    const data = await BusinessService.updateBusinessStatus({
      _id,
      status,
    });
    return { data };
  } catch (err) {
    console.log('error:', err);
    return { err };
  }
}
