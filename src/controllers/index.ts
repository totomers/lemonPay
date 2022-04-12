import { Business } from "../models/business";

import { BusinessesController } from "./business.controller";
export const businessesController = new BusinessesController(Business);
