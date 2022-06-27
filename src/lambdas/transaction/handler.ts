import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {
  formatErrorResponse,
  formatJSONResponse,
  ParsedAPIGatewayProxyEvent,
} from 'src/utils/api-gateway';
import { middyfy } from 'src/utils/lambda';
import { TransactionController } from 'src/controllers/transaction-controllers/_index';

export const emailReceipt = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const result = await TransactionController.emailReceipt(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);

export const addTransaction = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const result = await TransactionController.addTransaction(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
export const createMockTransactions = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const result = await TransactionController.createMockTransactions(
      event,
      context
    );
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
export const getTransactionHistory = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const result = await TransactionController.getTransactionHistory(
      event,
      context
    );
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);

export const createPhosToken = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await TransactionController.createPhosToken(event, context);

    if (result.err) return formatErrorResponse(result.err);

    return formatJSONResponse(result.data);
  }
);

export const validatePhosToken = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await TransactionController.validatePhosToken(
      event,
      context
    );

    if (result.err) return formatErrorResponse(result.err);

    return formatJSONResponse(result.data);
  }
);
