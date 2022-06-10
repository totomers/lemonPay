import { Context } from 'aws-lambda';
import { MessageUtil } from '../utils/message';
import { BusinessService } from '../services/business-service';
import { IBusinessDocument } from 'src/types/business.interface';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/customError';
import { IClaimsIdToken } from 'src/types/claimsIdToken.interface';
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
    const data = await BusinessService.getAllBusinessesHandler();
    return { data };
  } catch (err) {
    console.log('error:', err);
    return { err };
  }
}

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

/**
 * =======================================================================================================
 * Create business
 * =======================================================================================================
 */
export async function create(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const params: Partial<IBusinessDocument> = event?.body;
    const data = await BusinessService.createBusinessHandler(params);
    return { data };
  } catch (err) {
    console.log('error:', err);
    return { err };
  }
}

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
    const tokenClaims = event.requestContext.authorizer
      .claims as IClaimsIdToken;
    checkIfLemonPayAdmin(tokenClaims);
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
    const tokenClaims = event.requestContext.authorizer
      .claims as IClaimsIdToken;
    checkIfLemonPayAdmin(tokenClaims);
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
    const tokenClaims = event.requestContext.authorizer
      .claims as IClaimsIdToken;
    checkIfLemonPayAdmin(tokenClaims);
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

export const BusinessController = {
  getAll,
  create,
  getBusinessDetails,
  approveBusiness,
  declineBusiness,
  updateBusinessStatus,
  getBusinessCatalogs,
};
