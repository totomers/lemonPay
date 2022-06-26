import {
  APIGatewayProxyResult,
  CreateAuthChallengeTriggerEvent,
  DefineAuthChallengeTriggerEvent,
  VerifyAuthChallengeResponseTriggerEvent,
} from 'aws-lambda';
import {
  formatErrorResponse,
  formatJSONResponse,
  ParsedAPIGatewayProxyEvent,
} from 'src/utils/api-gateway';
import { CustomError } from 'src/utils/customError';
import { middyfy } from 'src/utils/lambda';
import { accountController } from '../../controllers';

export const createBusinessAccount = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await accountController.createBusinessAccount(
      event,
      context
    );

    if (result.err) return formatErrorResponse(result.err);

    return formatJSONResponse(result.data);
  }
);
export const createMockBusinessAccounts = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await accountController.createMockBusinessAccounts(
      event,
      context
    );

    if (result.err) return formatErrorResponse(result.err);

    return formatJSONResponse(result.data);
  }
);

export const verifyUserDetails = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await accountController.verifyUserDetails(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
export const uploadAdminPassport = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await accountController.uploadAdminPassport(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);

export const signInUser = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await accountController.signInUser(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);

export const refreshTokenSignInUser = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await accountController.refreshTokenSignIn(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);

export const logoutUser = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await accountController.logoutUser(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
export const signUpUser = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await accountController.signUpUser(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
export const resendConfirmationCode = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await accountController.resendConfirmationCode(
      event,
      context
    );

    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
export const confirmSignUp = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await accountController.confirmSignUpUser(event, context);

    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
export const setInitialPassword = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await accountController.setUsersInitialPassword(
      event,
      context
    );
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);

export const resetUserPassword = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await accountController.resetUserPassword(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
// export const confirmResetUserPassword = middyfy(
//   async (
//     event: ParsedAPIGatewayProxyEvent,
//     context
//   ): Promise<APIGatewayProxyResult> => {
//     const result = await accountController.respondToCustomAuthChallenge(
//       event,
//       context
//     );

//     if (result.err) return formatErrorResponse(result.err);
//     return formatJSONResponse(result.data);
//   }
// );

export const getUserStatus = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await accountController.getUserStatus(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
export const getUser = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await accountController.getUser(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
export const getUserFullDetails = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await accountController.getUserFullDetails(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
export const getBusinessAdminList = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await accountController.getBusinessAdminList(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);

export const defineAuthChallenge = middyfy(
  async (
    event: DefineAuthChallengeTriggerEvent,
    context
  ): Promise<DefineAuthChallengeTriggerEvent | Partial<CustomError>> => {
    const result = await accountController.defineCustomChallenge(
      event,
      context
    );
    if (result.err) return result.err;
    return result.data;
  }
);

export const createAuthChallenge = middyfy(
  async (
    event: CreateAuthChallengeTriggerEvent,
    context
  ): Promise<CreateAuthChallengeTriggerEvent | Partial<CustomError>> => {
    const result = await accountController.createAuthChallenge(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return result.data;
  }
);

export const verifyAuthChallenge = middyfy(
  async (
    event: VerifyAuthChallengeResponseTriggerEvent,
    context
  ): Promise<
    VerifyAuthChallengeResponseTriggerEvent | Partial<CustomError>
  > => {
    const result = await accountController.verifyAuthChallenge(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return result.data;
  }
);

export const initiateAuthWithEmail = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult | CustomError> => {
    const result = await accountController.initiateAuthChallengeWithEmail(
      event,
      context
    );
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
export const initiateAuthWithToken = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult | CustomError> => {
    const result = await accountController.initiateAuthChallengeWithToken(
      event,
      context
    );
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
export const respondToSignInChallenge = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult | CustomError> => {
    const result = await accountController.respondToSignInAuthChallenge(
      event,
      context
    );
    if (result.err) return formatErrorResponse(result.err);
    // if ('tokens' in result.data)
    //   return formatJSONResponseWithCookie(
    //     result.data,
    //     200,
    //     'refreshToken',
    //     result.data.tokens.refreshToken
    //   );

    return formatJSONResponse(result.data);
  }
);
export const respondToResetPassChallenge = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult | CustomError> => {
    const result = await accountController.respondToResetPassChallenge(
      event,
      context
    );
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);

export const createLemonPayAdmin = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult | CustomError> => {
    const result = await accountController.createLemonPayAdmin(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
export const signInLemonPayAdmin = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult | CustomError> => {
    const result = await accountController.signInLemonPayAdmin(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);

// export const createBusiness = middyfy(
//   async (event, context): Promise<APIGatewayProxyResult> => {
//     const newBusiness = await businessController.create(event, context);
//     return formatJSONResponse(newBusiness);
//   }
// );
