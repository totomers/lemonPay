import { Context } from 'aws-lambda';
import { BusinessService } from 'src/services/business-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';

/**
 * =======================================================================================================
 * Get All Businesses To Be Rewarded
 * =======================================================================================================
 */
export async function getBusinessesToBeRewarded(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    // const tokenClaims = event.requestContext.authorizer
    //   .claims as IClaimsIdToken;
    // checkIfLemonPayAdmin(tokenClaims);
    // const { _id, status } = event?.body;
    const data = await BusinessService.getBusinessesToBeRewardedHandler();
    return { data };
  } catch (err) {
    console.log('error:', err);
    return { err };
  }
}
