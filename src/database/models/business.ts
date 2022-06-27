import mongoose from 'mongoose';
import { IBusinessDocument } from 'src/types/business.interface';

const BusinessSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true },
    businessTradeName: { type: String, required: true },
    catalog: { type: mongoose.Schema.Types.ObjectId, ref: 'catalog' },
    rootUser: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    businessType: {
      type: String,
      enum: [
        'SoleTrader',
        'CommercialPartnership',
        'LimitedPartnership',
        'PublicPartnership',
      ],
      required: true,
    },
    industry: {
      type: String,
      // enum: ["TaxiCabsAndLimousines", "RailroadsFreight", "PassengerRailways"],
      required: true,
    },
    referralCode: { type: String, required: true, unique: true },
    referrerCode: { type: String },
    wasReferredAndRedeemed: { type: Boolean, required: true, default: false },
    //wasReferredAndExported:{ type: Boolean, required: true, default: false },
    businessesReferred: [
      {
        business: { type: mongoose.Schema.Types.ObjectId, ref: 'business' },
        wasReferrerRedeemed: { type: Boolean, default: false },
        //wasExported: { type: Boolean, default: false },
      },
    ],
    businessAddress: { type: String, required: true },
    businessHouseNumber: { type: String },
    businessZipCode: { type: String },
    businessRegistrationNumber: { type: String, required: true },
    bankAccountHolderName: { type: String, required: true },
    bankAccountIban: { type: String, required: true },
    bankAccountSwift: { type: String, required: true },
    status: {
      type: String,
      enum: ['pendingAction', 'pendingVerification', 'verified', 'unverified'],
      default: 'pendingAction',
      required: true,
    },
  },
  { timestamps: true }
);

export const Business =
  mongoose.models.businesses ||
  mongoose.model<IBusinessDocument>('business', BusinessSchema, 'businesses');
