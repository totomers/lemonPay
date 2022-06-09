import { connectToDatabase } from 'src/database/db';
import { Catalog } from 'src/database/models/catelog';
import { ICatalogDocument } from 'src/types/catalog.interface';
import { MongoCustomError } from 'src/utils/customError';

/**
 * ====================================================================================================
 * Create Catalog
 * @param params
 * ====================================================================================================
 */
export async function createCatalogHandler(params: Partial<ICatalogDocument>) {
  try {
    await connectToDatabase();

    // const { _id, name, items, subCatalogs } = params;
    console.log('catalog details:', params);

    const catalog = await Catalog.create(params);

    return catalog;
  } catch (err) {
    throw new MongoCustomError(err);
  }
}
