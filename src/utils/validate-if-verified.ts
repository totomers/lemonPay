import { IClaimsIdToken } from 'src/types/claimsIdToken.interface';
import { UnverifiedUserError } from './customError';

export const checkIfVerified = (claims: IClaimsIdToken) => {
  if (claims['custom:isVerified'] === '0') throw new UnverifiedUserError();
  else return;
};
