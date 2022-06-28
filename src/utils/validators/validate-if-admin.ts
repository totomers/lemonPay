import { IClaimsIdToken } from 'src/types/claimsIdToken.interface';
import { UnverifiedUserError } from '../customError';

export const checkIfAdmin = (claims: IClaimsIdToken) => {
  if (claims['custom:isAdmin'] === '0') throw new UnverifiedUserError();
  else return;
};
