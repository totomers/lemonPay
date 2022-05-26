import mongoose from 'mongoose';
import { IUserDocument } from 'src/types/user.interface';

const subSchemaUserBusiness = new mongoose.Schema(
  {
    business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER',
    },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    defaultBusiness: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'business',
      default: null,
    },
    name: { type: String, required: true },

    refferer: { type: mongoose.Schema.Types.ObjectId, ref: 'business' },
    dateofbirth: { type: Date, required: true },
    homeAddress: { type: String, required: true },
    homeHouseNumber: { type: String },
    homeZipCode: { type: String },
    email: { type: String, required: true, unique: true },
    businesses: [subSchemaUserBusiness],
    verificationImage: { type: String },
  },

  { timestamps: true }
);

// Note: OverwriteModelError: Cannot overwrite `User` model once compiled. error
export const User =
  mongoose.models.users ||
  mongoose.model<IUserDocument>('user', UserSchema, 'users');
