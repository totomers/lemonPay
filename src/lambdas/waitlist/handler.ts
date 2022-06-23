import { APIGatewayProxyResult } from 'aws-lambda';
import { waitlistController } from 'src/controllers';
import { formatErrorResponse, formatJSONResponse } from 'src/utils/api-gateway';
import { middyfy } from 'src/utils/lambda';

export const addBusinessesFromWaitlist = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const result = await waitlistController.addBusinesses(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
