import { Context } from 'aws-lambda';
import { TransactionService } from 'src/services/transaction-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/Errors';

/**
 * =======================================================================================================
 * Validate Token For Phos
 * =======================================================================================================
 */
export async function validatePhosToken(
  event: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const { preSharedPhosKey, token } = event.body;
    if (!preSharedPhosKey || !token)
      throw new MissingParamsError('pre-shared key, token');
    const data = await TransactionService.validatePhosTokenHandler({
      preSharedPhosKey,
      token,
    });

    return { data };
  } catch (err) {
    return { err };
  }
}
