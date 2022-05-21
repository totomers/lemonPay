import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { TransactionController } from 'src/controllers/transaction.controller';
import {
  formatErrorResponse,
  formatJSONResponse,
  ParsedAPIGatewayProxyEvent,
} from 'src/utils/api-gateway';
import { middyfy } from 'src/utils/lambda';
import { transactionController } from '../../controllers';

export const emailClientInvoice = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const result = await transactionController.emailClientInvoice(
      event,
      context
    );
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);

export const addTransaction = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const result = await transactionController.addTransaction(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
export const getUserTransactions = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const result = await transactionController.getUserTransactions(
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
