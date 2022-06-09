import { connectToDatabase } from 'src/database/db';
import { Catalog } from 'src/database/models/catelog';
import { ICatalogDocument } from 'src/types/catalog.interface';
import { MongoCustomError } from 'src/utils/customError';

/**
 * ====================================================================================================
 * Update Catalog
 * @param params
 * ====================================================================================================
 */
export async function updateCatalogHandler(params: Partial<ICatalogDocument>) {
  try {
    await connectToDatabase();

    console.log('catalog update params:', params);

    const catalog = await Catalog.findByIdAndUpdate(params._id, params, {
      new: true,
    });

    return catalog;
  } catch (err) {
    throw new MongoCustomError(err);
  }
}
