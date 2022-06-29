import { Context } from 'aws-lambda';
import { checkIfLemonPayAdmin } from 'src/utils/validators/validate-if-lemonpay-admin';
import { IClaimsIdToken } from 'src/types/claimsIdToken.interface';
import { ICatalogDocument } from 'src/types/catalog.interface';
import { CatalogService } from 'src/services/catalog-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';

/**
 * =======================================================================================================
 * Update Catalog In DB.
 * =======================================================================================================
 */
export async function updateCatalog(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    checkIfLemonPayAdmin(event);

    const params = event.body as Partial<ICatalogDocument>;

    const data = await CatalogService.updateCatalogHandler(params);
    return { data };
  } catch (err) {
    return { err };
  }
}
