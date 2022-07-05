import { IClaimsIdToken } from 'src/types/claimsIdToken.interface';
import { ParsedAPIGatewayProxyEvent } from '../api-gateway';
import { AdminOnlyError, MissingTokenClaimsError } from '../Errors';

export const checkIfLemonPayAdmin = (event: ParsedAPIGatewayProxyEvent) => {
  const tokenClaims = event.requestContext.authorizer.claims as IClaimsIdToken;
  if (!tokenClaims || !tokenClaims['custom:isLemonPayAdmin'])
    throw new MissingTokenClaimsError();
  if (tokenClaims['custom:isLemonPayAdmin'] === '0') throw new AdminOnlyError();
  else return;
};
