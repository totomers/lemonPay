import { IClaimsIdToken } from 'src/types/claimsIdToken.interface';
import { ParsedAPIGatewayProxyEvent } from '../api-gateway';
import { UnverifiedUserError } from '../customError';

export const checkIfAdmin = (event: ParsedAPIGatewayProxyEvent) => {
  const tokenClaims = event.requestContext.authorizer.claims as IClaimsIdToken;

  if (tokenClaims['custom:isAdmin'] === '0') throw new UnverifiedUserError();
  else return;
};
