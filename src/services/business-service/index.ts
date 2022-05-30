import { createBusinessHandler } from './handlers/createBusiness.handler';
import { editBusinessHandler } from './handlers/editBusiness.handler';
import { getAllBusinessesHandler } from './handlers/getAllBusiness.handler';
import { getBusinessDetailsHandler } from './handlers/getBusinessDetails.handler';
export const BusinessService = {
  createBusinessHandler,
  editBusinessHandler,
  getAllBusinessesHandler,
  getBusinessDetailsHandler,
};
