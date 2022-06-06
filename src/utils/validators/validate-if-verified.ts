import { IClaimsIdToken } from 'src/types/claimsIdToken.interface';
import { AdminOnlyError } from '../customError';

export const checkIfVerified = (claims: IClaimsIdToken) => {
  if (claims['custom:isVerified'] === '0') throw new AdminOnlyError();
  else return;
};
