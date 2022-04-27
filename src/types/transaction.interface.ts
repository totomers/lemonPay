import mongoose from "mongoose";
import { ICurrencyCodes } from "./currencyCodes.interace";
import { ITransactionStatus } from "./transactionStatus.interface";

export type ITransactionDocument = mongoose.Document & {
  businessId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  amount: number;
  currency: ICurrencyCodes;
  status: ITransactionStatus;
};
