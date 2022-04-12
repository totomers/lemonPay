import mongoose from "mongoose";
import { IUserDocument } from "src/types/user.interface";

const UserSchema = new mongoose.Schema(
  {
    business_id: { type: [mongoose.Schema.Types.ObjectId], ref: "Business" },
    name: { type: String, required: true },
    birth_date: { type: Date, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

// Note: OverwriteModelError: Cannot overwrite `Books` model once compiled. error
export const User =
  mongoose.models.users ||
  mongoose.model<IUserDocument>(
    "user",
    UserSchema,
    process.env.DB_USER_COLLECTION
  );
