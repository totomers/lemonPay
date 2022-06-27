import { Context } from 'aws-lambda';
import { AccountService } from 'src/services/account-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/customError';

/**
 * =======================================================================================================
 * Create Mock Business Accounts
 * =======================================================================================================
 */
export async function createMockBusinessAccounts(
  event: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const emailNameList = event.body as { email: string; name: string }[];

    if (!emailNameList) throw new MissingParamsError('emailNameList');

    const data = await AccountService.createMockBusinessAccounts({
      emailNameList,
    });

    return { data };
  } catch (err) {
    return { err };
  }
}
