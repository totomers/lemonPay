import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatErrorResponse, formatJSONResponse } from "src/utils/api-gateway";
import { middyfy } from "src/utils/lambda";
import { transactionController } from "../../controllers";

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
