import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "src/utils/api-gateway";
import { middyfy } from "src/utils/lambda";
import { transactionController } from "../../controllers";

export const emailClientInvoice = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const result = await transactionController.emailClientInvoice(
      event,
      context
    );
    if (result.data) return formatJSONResponse(result.data);
    if (result.err)
      return formatJSONResponse(result.err.message, result.err.statusCode);
  }
);
