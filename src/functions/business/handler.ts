import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "src/utils/api-gateway";
import { middyfy } from "src/utils/lambda";
import { businessController } from "../../controllers";

export const getAllBusinesses = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const businesses = await businessController.getAll(event, context);
    return formatJSONResponse(businesses);
  }
);

export const createBusiness = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const newBusiness = await businessController.create(event, context);
    return formatJSONResponse(newBusiness);
  }
);
