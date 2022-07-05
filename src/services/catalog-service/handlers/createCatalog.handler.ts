import { connectToDatabase } from 'src/database/db';
import { Business } from 'src/database/models/business';
import { Catalog } from 'src/database/models/catalog';
import { ICatalogDocument } from 'src/types/catalog.interface';
import { MongoCustomError } from 'src/utils/Errors';

/**
 * ====================================================================================================
 * Create Catalog
 * @param params
 * ====================================================================================================
 */
export async function createCatalogHandler(params: {
  businessId: string;
  initialCatalog: Partial<ICatalogDocument>;
}) {
  try {
    await connectToDatabase();

    const { businessId, initialCatalog } = params;
    console.log('catalog details:', initialCatalog);

    const catalog = await Catalog.create(initialCatalog);
    if (catalog._id)
      await Business.findByIdAndUpdate(businessId, { catalog: catalog._id });

    return catalog;
  } catch (err) {
    throw new MongoCustomError(err);
  }
}
