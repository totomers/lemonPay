import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { accountController } from "../../controllers";

export const createBusinessAccount = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const businesses = await accountController.createBusinessAccount(
      event,
      context
    );
    return formatJSONResponse(businesses);
  }
);

export const verifyUserDetails = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const isVerified = await accountController.verifyUserDetails(
      event,
      context
    );
    return formatJSONResponse(isVerified);
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
    return formatJSONResponse(result);
  }
);
export const signUpUser = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const result = await accountController.signUpUser(event, context);
    return formatJSONResponse(result);
  }
);
export const confirmSignUp = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const result = await accountController.confirmSignUpUser(event, context);
    if (result) return formatJSONResponse(result);
  }
);
export const addUserToGroup = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const result = await accountController.addUserToGroup(event, context);
    if (result) return formatJSONResponse(result);
  }
);

// export const createBusiness = middyfy(
//   async (event, context): Promise<APIGatewayProxyResult> => {
//     const newBusiness = await businessController.create(event, context);
//     return formatJSONResponse(newBusiness);
//   }
// );
