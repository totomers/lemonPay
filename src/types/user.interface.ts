import mongoose from 'mongoose';

export type IUserDocument = mongoose.Document & {
  name: string;
  defaultBusiness: mongoose.Schema.Types.ObjectId[] | null;
  businesses: {
    business: mongoose.Schema.Types.ObjectId;
    role: 'USER' | 'ADMIN';
  }[];
  dateofbirth: string;
  homeAddress: string;
  homeHouseNumber: string;
  homeZipCode: string;
  email: string;
  verificationImage?: string;
};
