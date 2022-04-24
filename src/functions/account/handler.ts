import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "src/utils/api-gateway";
import { middyfy } from "src/utils/lambda";
import { accountController } from "../../controllers";

export const createBusinessAccount = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const result = await accountController.createBusinessAccount(
      event,
      context
    );
    if (result.data) return formatJSONResponse(result.data);
    if (result.err)
      return formatJSONResponse(result.err.message, result.err.statusCode);
  }
);

export const verifyUserDetails = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const result = await accountController.verifyUserDetails(event, context);
    if (result.data) return formatJSONResponse(result.data);
    if (result.err)
      return formatJSONResponse(result.err.message, result.err.statusCode);
  }
);

export const getVerifiedOnlySecret = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const secret = "apples";
    return formatJSONResponse(secret);
  }
);

export const signInUser = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const result = await accountController.signInUser(event, context);
    if (result.data) return formatJSONResponse(result.data);
    if (result.err)
      return formatJSONResponse(result.err.message, result.err.statusCode);
  }
);
export const signUpUser = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const result = await accountController.signUpUser(event, context);
    if (result.data) return formatJSONResponse(result.data);
    if (result.err)
      return formatJSONResponse(result.err.message, result.err.statusCode);
  }
);
export const resendConfirmationCode = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const result = await accountController.resendConfirmationCode(
      event,
      context
    );
    if (result.data) return formatJSONResponse(result.data);
    if (result.err)
      return formatJSONResponse(result.err.message, result.err.statusCode);
  }
);
export const confirmSignUp = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const result = await accountController.confirmSignUpUser(event, context);
    if (result.data) return formatJSONResponse(result.data);
    if (result.err)
      return formatJSONResponse(result.err.message, result.err.statusCode);
  }
);
export const setInitialPassword = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const result = await accountController.setUsersInitialPassword(
      event,
      context
    );
    if (result.data) return formatJSONResponse(result.data);
    if (result.err)
      return formatJSONResponse(result.err.message, result.err.statusCode);
  }
);
export const addUserToGroup = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const result = await accountController.addUserToGroup(event, context);
    if (result.data) return formatJSONResponse(result.data);
    if (result.err)
      return formatJSONResponse(result.err.message, result.err.statusCode);
  }
);
export const getVerificationStatus = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const result = await accountController.getVerificationStatus(
      event,
      context
    );
    if (result.data) return formatJSONResponse(result.data);
    if (result.err)
      return formatJSONResponse(result.err.message, result.err.statusCode);
  }
);

// export const createBusiness = middyfy(
//   async (event, context): Promise<APIGatewayProxyResult> => {
//     const newBusiness = await businessController.create(event, context);
//     return formatJSONResponse(newBusiness);
//   }
// );
