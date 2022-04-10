import mongoose from "mongoose";
import { IRole } from "./role.interface";

export type IBusinessDocument = mongoose.Document & {
  name: string;
  trade_name: string;
  users: { user: mongoose.Schema.Types.ObjectId; role: IRole }[];
  legal_type: string;
  industry: string;
  address: string;
  merchant_id: string;
  bank_account_name: string;
  IBAN: string;
  BIC: string;
};
