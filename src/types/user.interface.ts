import mongoose from "mongoose";

export type IUserDocument = mongoose.Document & {
  name: string;
  business_id: mongoose.Schema.Types.ObjectId[];
  birth_date: string;
  address: string;
  email: string;
  phone: string;
};
