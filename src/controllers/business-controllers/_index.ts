import { addReferrerToBusiness } from './addReferrerToBusiness.controller';
import { approveBusiness } from './approveBusiness.controller';
import { create } from './create.controller';
import { declineBusiness } from './declineBusiness.controller';
import { getAll } from './getAll.controller';
import { getAutocomplete } from './getAutocomplete.controller';
import { getBusinessCatalogs } from './getBusinessCatalogs.controller';
import { getBusinessDetails } from './getBusinessDetails.controller';
import { getBusinessesToBeRewarded } from './getBusinessesToBeRewarded.controller';
import { updateBusinessStatus } from './updateBusinessStatus.controller';
import { addWaitlistBusinesses } from './addWaitlistBusinesses.controller';

export const BusinessController = {
  getAll,
  create,
  addReferrerToBusiness,
  getBusinessDetails,
  approveBusiness,
  declineBusiness,
  updateBusinessStatus,
  getBusinessCatalogs,
  getAutocomplete,
  getBusinessesToBeRewarded,
  addWaitlistBusinesses,
};
