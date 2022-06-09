import mongoose from 'mongoose';
import { ICatalogDocument } from 'src/types/catalog.interface';

const ItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
  }
  // { _id: false }
);

const CatalogSchema = new mongoose.Schema();
CatalogSchema.add({
  name: { type: String, required: true, default: 'no-name' },
  items: { type: [ItemSchema] },
  subMenus: [CatalogSchema],
});

export const Catalog =
  mongoose.models.catalogs ||
  mongoose.model<ICatalogDocument>('catalog', CatalogSchema, 'catalogs');
