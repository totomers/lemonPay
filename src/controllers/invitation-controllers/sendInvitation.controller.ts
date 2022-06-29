import { Context } from 'aws-lambda';
import { InvitationService } from 'src/services/invitation-service';
import { IClaimsIdToken } from 'src/types/claimsIdToken.interface';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/customError';
import { checkIfAdmin } from 'src/utils/validators/validate-if-admin';

/**
 * =======================================================================================================
 * Create a new employee invitation and email the invite.
 * =======================================================================================================
 */
export async function sendInvitation(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    checkIfAdmin(event);
    const email = event.body?.email;
    const businessId = event.body?.businessId;
    if (!email || !businessId)
      throw new MissingParamsError('email, businessId');
    const data = await InvitationService.sendInvitationHandler({
      businessId,
      email,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
