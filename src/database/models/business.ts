import mongoose from 'mongoose';
import { IBusinessDocument } from 'src/types/business.interface';

const BusinessSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true },
    businessTradeName: { type: String, required: true },
    // users: [
    //   {
    //     user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    //     role: { type: String, required: true },
    //   },
    // ],
    catalog: { type: mongoose.Schema.Types.ObjectId, ref: 'catalog' },
    businessAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
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

// Note: OverwriteModelError: Cannot overwrite `Books` model once compiled. error
export const Business =
  mongoose.models.businesses ||
  mongoose.model<IBusinessDocument>('business', BusinessSchema, 'businesses');
