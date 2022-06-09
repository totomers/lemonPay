import mongoose from 'mongoose';

type IItem = mongoose.Document & {
  name: string;
  price: number;
};

export type ICatalogDocument = mongoose.Document & {
  name: string;
  items: IItem[];
  subCatalogs: ICatalogDocument[];
};
