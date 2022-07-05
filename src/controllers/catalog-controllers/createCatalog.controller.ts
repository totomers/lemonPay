import { Context } from 'aws-lambda';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/Errors';
import { checkIfLemonPayAdmin } from 'src/utils/validators/validate-if-lemonpay-admin';
import { IClaimsIdToken } from 'src/types/claimsIdToken.interface';
import { CatalogService } from 'src/services/catalog-service';

/**
 * =======================================================================================================
 * Add Catalog To DB.
 * =======================================================================================================
 */
export async function createCatalog(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    checkIfLemonPayAdmin(event);

    const { businessId, initialCatalog } = event.body;
    if (!businessId || !initialCatalog)
      throw new MissingParamsError('businessId, initialCatalog');

    const data = await CatalogService.createCatalogHandler({
      businessId,
      initialCatalog,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}
