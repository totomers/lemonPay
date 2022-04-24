import mongoose from "mongoose";

export type IUserDocument = mongoose.Document & {
  name: string;
  business_id: mongoose.Schema.Types.ObjectId[];
  dateofbirth: string;
  homeAddress: string;
  homeHouseNumber: string;
  homeZipCode: string;
  email: string;
};
