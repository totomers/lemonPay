import mongoose from "mongoose";
import { IBusinessDocument } from "src/types/business.interface";

const BusinessSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    trade_name: { type: String, required: true },
    users: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: { type: String, required: true },
      },
    ],
    legal_type: { type: String, required: true },
    industry: { type: String, required: true },
    address: { type: String, required: true },
    merchant_id: { type: String, required: true },
    bank_account_name: { type: String, required: true },
    IBAN: { type: String, required: true },
    BIC: { type: String, required: true },
  },
  { timestamps: true }
);

// Note: OverwriteModelError: Cannot overwrite `Books` model once compiled. error
export const Business =
  mongoose.models.businesses ||
  mongoose.model<IBusinessDocument>(
    "business",
    BusinessSchema,
    process.env.DB_BUSINESSES_COLLECTION
  );
