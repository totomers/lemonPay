import { Context } from 'aws-lambda';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/customError';
import { checkIfLemonPayAdmin } from 'src/utils/validators/validate-if-lemonpay-admin';
import { IClaimsIdToken } from 'src/types/claimsIdToken.interface';
import { ICatalogDocument } from 'src/types/catalog.interface';
import { CatalogService } from 'src/services/catalog-service';

/**
 * =======================================================================================================
 * Add Catalog To DB.
 * =======================================================================================================
 */
export async function createCatalog(event?: any, context?: Context) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const tokenClaims = event.requestContext.authorizer
      .claims as IClaimsIdToken;
    checkIfLemonPayAdmin(tokenClaims);

    const params = event.body as Partial<ICatalogDocument>;

    const data = await CatalogService.createCatalogHandler(params);
    return { data };
  } catch (err) {
    return { err };
  }
}

/**
 * =======================================================================================================
 * Get Catalog From DB.
 * =======================================================================================================
 */
export async function getCatalog(event?: any, context?: Context) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const tokenClaims = event.requestContext.authorizer
      .claims as IClaimsIdToken;
    checkIfLemonPayAdmin(tokenClaims);

    const _id = event.pathParameters._id;
    if (!_id) throw new MissingParamsError('_id');

    const data = await CatalogService.getCatalogHandler({ _id });
    return { data };
  } catch (err) {
    return { err };
  }
}

/**
 * =======================================================================================================
 * Update Catalog In DB.
 * =======================================================================================================
 */
export async function updateCatalog(event?: any, context?: Context) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const tokenClaims = event.requestContext.authorizer
      .claims as IClaimsIdToken;
    checkIfLemonPayAdmin(tokenClaims);

    const params = event.body as Partial<ICatalogDocument>;

    const data = await CatalogService.updateCatalogHandler(params);
    return { data };
  } catch (err) {
    return { err };
  }
}

export const CatalogController = {
  getCatalog,
  createCatalog,
  updateCatalog,
};
