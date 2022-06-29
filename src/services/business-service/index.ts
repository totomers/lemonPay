import { createBusinessHandler } from './handlers/createBusiness.handler';
import { editBusinessHandler } from './handlers/editBusiness.handler';
import { getAllBusinessesHandler } from './handlers/getAllBusinesses.handler';
import { getBusinessDetailsHandler } from './handlers/getBusinessDetails.handler';
import { approveBusinessHandler } from './handlers/approveBusiness.handler';
import { declineBusinessHandler } from './handlers/declineBusiness.handler';
import { updateBusinessStatus } from './handlers/updateBusinessStatus';
import { getBusinessCatalogsHandler } from './handlers/getBusinessCatalogs';
import { autocompleteHandler } from './handlers/autocomplete.handler';
import { addReferrerToBusinesssHandler } from './handlers/addReferrerToBusiness.handler';
import { getBusinessesToBeRewardedHandler } from './handlers/getBusinessesToBeRewarded.handler';
import { getBusinessUsers } from './handlers/getBusinessUsers.handler';

export const BusinessService = {
  createBusinessHandler,
  editBusinessHandler,
  getAllBusinessesHandler,
  getBusinessDetailsHandler,
  approveBusinessHandler,
  declineBusinessHandler,
  updateBusinessStatus,
  getBusinessCatalogsHandler,
  autocompleteHandler,
  addReferrerToBusinesssHandler,
  getBusinessesToBeRewardedHandler,
  getBusinessUsers,
};
