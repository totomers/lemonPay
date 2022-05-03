import mongoose from "mongoose";
import { IUserDocument } from "src/types/user.interface";

const UserSchema = new mongoose.Schema(
  {
    business_id: { type: [mongoose.Schema.Types.ObjectId], ref: "Business" },
    name: { type: String, required: true },
    dateofbirth: { type: Date, required: true },
    homeAddress: { type: String, required: true },
    homeHouseNumber: { type: String },
    homeZipCode: { type: String },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

// Note: OverwriteModelError: Cannot overwrite `User` model once compiled. error
export const User =
  mongoose.models.users ||
  mongoose.model<IUserDocument>("user", UserSchema, "users");
