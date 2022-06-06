import { IClaimsIdToken } from 'src/types/claimsIdToken.interface';
import { UnverifiedUserError } from '../customError';

export const checkIfLemonPayAdmin = (claims: IClaimsIdToken) => {
  if (claims['custom:isLemonPayAdmin'] === '0') throw new UnverifiedUserError();
  else return;
};
