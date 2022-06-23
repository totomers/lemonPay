import mongoose from 'mongoose';
import { IWaitListBusinessDocument } from 'src/types/waitingListBusiness.interface';

const WaitListBusinessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String },
  phone: { type: String },
  referralCode: { type: String, required: true },
  referrerCode: { type: String },
  email: { type: String, required: true, unique: true },
});

export const WaitListBusiness =
  mongoose.models.waitListBusinesses ||
  mongoose.model<IWaitListBusinessDocument>(
    'waitListBusiness',
    WaitListBusinessSchema,
    'waitListBusinesses'
  );
