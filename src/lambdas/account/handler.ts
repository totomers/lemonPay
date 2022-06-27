import { APIGatewayProxyResult } from 'aws-lambda';
import {
  formatErrorResponse,
  formatJSONResponse,
  ParsedAPIGatewayProxyEvent,
} from 'src/utils/api-gateway';
import { middyfy } from 'src/utils/lambda';
import { AccountController } from '../../controllers/account-controllers/_index';

export const createBusinessAccount = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await AccountController.createBusinessAccount(
      event,
      context
    );

    if (result.err) return formatErrorResponse(result.err);

    return formatJSONResponse(result.data);
  }
);
export const createMockBusinessAccounts = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await AccountController.createMockBusinessAccounts(
      event,
      context
    );

    if (result.err) return formatErrorResponse(result.err);

    return formatJSONResponse(result.data);
  }
);

export const verifyUserDetails = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await AccountController.verifyUserDetails(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
export const uploadAdminPassport = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await AccountController.uploadAdminPassport(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);

export const getUser = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await AccountController.getUser(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
export const getUserFullDetails = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await AccountController.getUserFullDetails(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
