import { IClaimsIdToken } from 'src/types/claimsIdToken.interface';
import { UnverifiedUserError } from '../customError';

export const checkIfRootUser = (claims: IClaimsIdToken) => {
  if (claims['custom:isRootUser'] === '0') throw new UnverifiedUserError();
  else return;
};
