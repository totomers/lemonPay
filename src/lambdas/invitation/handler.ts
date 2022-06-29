import { APIGatewayProxyResult } from 'aws-lambda';
import { InvitationController } from 'src/controllers/invitation-controllers/_index';
import { formatErrorResponse, formatJSONResponse } from 'src/utils/api-gateway';
import { middyfy } from 'src/utils/lambda';

export const sendInvitation = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const result = await InvitationController.sendInvitation(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
