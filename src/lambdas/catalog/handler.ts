import { APIGatewayProxyResult } from 'aws-lambda';
import {
  formatErrorResponse,
  formatJSONResponse,
  ParsedAPIGatewayProxyEvent,
} from 'src/utils/api-gateway';
import { middyfy } from 'src/utils/lambda';
import { catalogController } from '../../controllers';

export const getCatalog = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await catalogController.getCatalog(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);

export const createCatalog = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await catalogController.createCatalog(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
export const updateCatalog = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await catalogController.updateCatalog(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
