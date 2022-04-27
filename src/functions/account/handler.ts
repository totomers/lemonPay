import { APIGatewayProxyResult } from "aws-lambda";
import {
  formatErrorResponse,
  formatJSONResponse,
  ParsedAPIGatewayProxyEvent,
} from "src/utils/api-gateway";
import { middyfy } from "src/utils/lambda";
import { accountController } from "../../controllers";

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

export const getVerifiedOnlySecret = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const secret = "apples";
    return formatJSONResponse(secret);
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
export const confirmResetUserPassword = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await accountController.confirmResetUserPassword(
      event,
      context
    );

    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);

export const getVerificationStatus = middyfy(
  async (
    event: ParsedAPIGatewayProxyEvent,
    context
  ): Promise<APIGatewayProxyResult> => {
    const result = await accountController.getVerificationStatus(
      event,
      context
    );
    if (result.err) return formatErrorResponse(result.err);
    return formatJSONResponse(result.data);
  }
);

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

// export const createBusiness = middyfy(
//   async (event, context): Promise<APIGatewayProxyResult> => {
//     const newBusiness = await businessController.create(event, context);
//     return formatJSONResponse(newBusiness);
//   }
// );
