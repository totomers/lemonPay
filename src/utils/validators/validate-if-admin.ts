import { IClaimsIdToken } from 'src/types/claimsIdToken.interface';
import { ParsedAPIGatewayProxyEvent } from '../api-gateway';
import { AdminOnlyError, MissingTokenClaimsError } from '../Errors';

export const checkIfAdmin = (event: ParsedAPIGatewayProxyEvent) => {
  const tokenClaims = event.requestContext.authorizer.claims as IClaimsIdToken;
  if (!tokenClaims || !tokenClaims['custom:isAdmin'])
    throw new MissingTokenClaimsError();
  if (tokenClaims['custom:isAdmin'] === '0') throw new AdminOnlyError();
  else return;
};
