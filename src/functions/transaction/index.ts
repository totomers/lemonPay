import { CONFIG } from "src/config";
import { handlerPath } from "src/utils/handler-resolver";

export const sendClientEmailAfterTransaction = {
  handler: `${handlerPath(__dirname)}/handler.sendClientEmailAfterTransaction`,
  events: [
    {
      http: {
        method: "post",
        path: "transactions/emailClientSuccessMessage",
        authorizer: {
          arn: CONFIG.COGNITO.USER_POOL_ARN,
        },
      },
    },
  ],
};
