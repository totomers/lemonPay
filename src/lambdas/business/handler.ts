import { APIGatewayProxyResult } from 'aws-lambda';
import {
  formatErrorResponse,
  formatJSONResponse,
  ParsedAPIGatewayProxyEvent,
} from 'src/utils/api-gateway';
import { middyfy } from 'src/utils/lambda';
import { businessController } from '../../controllers';

export const getAllBusinesses = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await businessController.getAll(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
export const getBusinessCatalogs = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await businessController.getBusinessCatalogs(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
export const getBusinessDetails = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await businessController.getBusinessDetails(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
export const getAutocomplete = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await businessController.getAutocomplete(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
export const createBusiness = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await businessController.create(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);

export const addReferrerToBusiness = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await businessController.addReferrerToBusiness(
      event,
      context
    );
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
export const approveBusiness = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await businessController.approveBusiness(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
export const declineBusiness = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await businessController.declineBusiness(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
export const updateBusinessStatus = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await businessController.updateBusinessStatus(
      event,
      context
    );
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
