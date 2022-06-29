import { Context } from 'aws-lambda';
import { AccountService } from 'src/services/account-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/customError';
import { CustomError } from 'src/utils/customError';

/**
 * =======================================================================================================
 * Change User Role
 * =======================================================================================================
 */
export async function changeUserRole(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { userId, businessId, role } = event.body;

    if (!userId || !businessId || !role)
      throw new MissingParamsError('userId, businessId, role');

    if (!(role === 'ADMIN' || role === 'USER'))
      throw new CustomError(
        "Invalid value given for 'role'",
        400,
        'InvalidRoleException'
      );
    const data = await AccountService.changeUserRoleHandler({
      userId,
      businessId,
      role,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
