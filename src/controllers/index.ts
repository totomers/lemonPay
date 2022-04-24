// import { Business } from "../models/business";

import {
  //   BusinessesController,
  BusinessController,
} from "./business.controller";
import { AccountController } from "./account.controller";
import { TransactionController } from "./transaction.controller";
// export const businessesController = new BusinessesController(Business);
export const businessController = BusinessController;
export const accountController = AccountController;
export const transactionController = TransactionController;
