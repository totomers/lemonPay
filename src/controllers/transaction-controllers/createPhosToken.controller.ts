import { Context } from 'aws-lambda';
import { TransactionService } from 'src/services/transaction-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/customError';

/**
 * =======================================================================================================
 * Generate Token For Phos
 * =======================================================================================================
 */
export async function createPhosToken(
  event: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const { email } = event.requestContext.authorizer.claims;

    if (!email) throw new MissingParamsError('email');
    const userId = 'mongoDbUserId/otherUserId';
    const data = await TransactionService.createPhosTokenHandler({
      email,
      userId,
    });

    return { data };
  } catch (err) {
    return { err };
  }
}
