import { Context } from 'aws-lambda';
import { AccountService } from 'src/services/account-service';
import { PipedriveService } from 'src/services/pipedrive-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/Errors';

/**
 * =======================================================================================================
 * Test Pipedrive
 * =======================================================================================================
 */
export async function pipedriveTester(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    // const email =
    //   event.requestContext.authorizer?.claims?.email || 'tomere@moveo.co.il';
    // if (!email) throw new MissingParamsError('email');
    const data = await PipedriveService.addToPipedriveHandler({
      name: 'Tomer',
      email: 'tomere@moveo.co.il',
      promoCode: 'df23432',
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
