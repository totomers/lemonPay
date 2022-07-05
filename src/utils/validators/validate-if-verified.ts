import { IClaimsIdToken } from 'src/types/claimsIdToken.interface';
import { AdminOnlyError } from '../Errors';

export const checkIfVerified = (claims: IClaimsIdToken) => {
  if (claims['custom:isVerified'] === '0') throw new AdminOnlyError();
  else return;
};
