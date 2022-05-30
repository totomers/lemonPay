import { Context } from 'aws-lambda';
import { MessageUtil } from '../utils/message';
import { BusinessService } from '../services/business-service';
import { IBusinessDocument } from 'src/types/business.interface';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';

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
    const result = await BusinessService.getAllBusinessesHandler();
    return result;
  } catch (err) {
    console.error(err);
    console.log('error:', err);
    return MessageUtil.error(err.code, err.message);
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
    const { _id } = event.body;
    const result = await BusinessService.getBusinessDetailsHandler({ _id });
    return result;
  } catch (err) {
    console.error(err);
    console.log('error:', err);
    return MessageUtil.error(err.code, err.message);
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
    const result = await BusinessService.createBusinessHandler(params);
    return result;
  } catch (err) {
    console.error(err);
    console.log('error:', err);
    return MessageUtil.error(err.code, err.message);
  }
}

export const BusinessController = {
  getAll,
  create,
  getBusinessDetails,
};
