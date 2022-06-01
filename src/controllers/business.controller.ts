import { Context } from 'aws-lambda';
import { MessageUtil } from '../utils/message';
import { BusinessService } from '../services/business-service';
import { IBusinessDocument } from 'src/types/business.interface';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/customError';

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

export const BusinessController = {
  getAll,
  create,
  getBusinessDetails,
};
