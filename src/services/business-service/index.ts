import { createBusinessHandler } from './handlers/createBusiness.handler';
import { editBusinessHandler } from './handlers/editBusiness.handler';
import { getAllBusinessesHandler } from './handlers/getAllBusiness.handler';
import { getBusinessDetailsHandler } from './handlers/getBusinessDetails.handler';
import { approveBusinessHandler } from './handlers/approveBusiness.handler';
import { declineBusinessHandler } from './handlers/declineBusiness.handler';
import { updateBusinessStatus } from './handlers/updateBusinessStatus';
export const BusinessService = {
  createBusinessHandler,
  editBusinessHandler,
  getAllBusinessesHandler,
  getBusinessDetailsHandler,
  approveBusinessHandler,
  declineBusinessHandler,
  updateBusinessStatus,
};
