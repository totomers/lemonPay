import { Context } from 'aws-lambda';
import { BusinessService } from 'src/services/business-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/Errors';
/**
 * =======================================================================================================
 * Get autocomplete results from kvk
 * =======================================================================================================
 */
export async function getAutocomplete(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    // const name = event.pathParameters.name;
    const querystring = event?.queryStringParameters;
    const name = querystring?.name;
    if (!name) throw new MissingParamsError('name');
    const data = await BusinessService.autocompleteHandler({ name });
    return { data };
  } catch (err) {
    console.log('error:', err);
    return { err };
  }
}
