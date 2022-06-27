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
import { middyfy } from 'src/utils/lambda';
import { CognitoController } from '../../controllers/cognito-controllers/_index';

export const signInUser = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await CognitoController.signInUser(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);

export const refreshTokenSignInUser = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await CognitoController.refreshTokenSignIn(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);

export const logoutUser = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await CognitoController.logoutUser(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
export const signUpUser = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await CognitoController.signUpUser(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
export const resendConfirmationCode = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await CognitoController.resendConfirmationCode(
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
    const result = await CognitoController.confirmSignUpUser(event, context);

    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
export const setInitialPassword = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await CognitoController.setUsersInitialPassword(
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
    const result = await CognitoController.resetUserPassword(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
// export const confirmResetUserPassword = middyfy(
//   async (
//     event: ParsedAPIGatewayProxyEvent,
//     context
//   ): Promise<APIGatewayProxyResult> => {
//     const result = await CognitoController.respondToCustomAuthChallenge(
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
    const result = await CognitoController.getUserStatus(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);

export const defineAuthChallenge = middyfy(
  async (
    event: DefineAuthChallengeTriggerEvent,
    context
  ): Promise<DefineAuthChallengeTriggerEvent> => {
    const result = await CognitoController.defineCustomChallenge(
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
  ): Promise<CreateAuthChallengeTriggerEvent> => {
    const result = await CognitoController.createAuthChallenge(event, context);
    if (result.err) return result.err;
    return result.data;
  }
);

export const verifyAuthChallenge = middyfy(
  async (
    event: VerifyAuthChallengeResponseTriggerEvent,
    context
  ): Promise<VerifyAuthChallengeResponseTriggerEvent> => {
    const result = await CognitoController.verifyAuthChallenge(event, context);
    if (result.err) return result.err;
    return result.data;
  }
);

export const initiateAuthWithEmail = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await CognitoController.initiateAuthChallengeWithEmail(
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
  ): Promise<APIGatewayProxyResult> => {
    const result = await CognitoController.initiateAuthChallengeWithToken(
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
  ): Promise<APIGatewayProxyResult> => {
    const result = await CognitoController.respondToSignInAuthChallenge(
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
  ): Promise<APIGatewayProxyResult> => {
    const result = await CognitoController.respondToResetPassChallenge(
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
  ): Promise<APIGatewayProxyResult> => {
    const result = await CognitoController.createLemonPayAdmin(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
export const signInLemonPayAdmin = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await CognitoController.signInLemonPayAdmin(event, context);
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);
