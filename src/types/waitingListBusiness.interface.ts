import mongoose from 'mongoose';

export type IWaitListBusinessDocument = mongoose.Document & {
  name: string;
  lastName: null;
  email: string;
  phone: number;
  referralCode: string;
  referrerCode: string;
};
