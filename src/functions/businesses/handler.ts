import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { businessesController } from "../../controllers";

export const getAllBusinesses = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    const businesses = await businessesController.getAll(event, context);
    return formatJSONResponse(businesses);
  }
);

export const createBusiness = middyfy(
  async (event, context): Promise<APIGatewayProxyResult> => {
    // console.log("event received from handler" + event);
    console.log("1) business handler");

    const newBusiness = await businessesController.create(event, context);
    // console.log("new business", newBusiness);

    return formatJSONResponse(newBusiness);
  }
);
