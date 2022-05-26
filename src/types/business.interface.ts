import mongoose from 'mongoose';
// import { IRole } from './role.interface';

export type IBusinessDocument = mongoose.Document & {
  businessName: string;
  businessTradeName: string;
  // users: { user: mongoose.Schema.Types.ObjectId; role: IRole }[];
  businessType:
    | 'SoleTrader'
    | 'CommercialPartnership'
    | 'LimitedPartnership'
    | 'PublicPartnership';
  industry: string;
  businessAddress: string;
  businessHouseNumber: string;
  businessZipCode: string;
  businessRegistrationNumber: string;
  bankAccountHolderName: string;
  bankAccountIban: string;
  bankAccountSwift: string;
  referralCode: string;
};
