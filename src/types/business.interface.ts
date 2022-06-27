import mongoose from 'mongoose';
// import { IRole } from './role.interface';

export type IBusinessDocument = mongoose.Document & {
  businessName: string;
  businessTradeName: string;
  catalog: mongoose.Types.ObjectId;
  rootUser: mongoose.Types.ObjectId;
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
  referrerCode: string;
  businessesReferred: { business: string; wasRedeemed?: boolean }[];
  status: 'pendingAction' | 'pendingVerification' | 'verified' | 'unverified';
};
