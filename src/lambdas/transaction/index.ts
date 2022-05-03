import { CONFIG } from "src/config";
import { handlerPath } from "src/utils/handler-resolver";

export const emailClientInvoice = {
  handler: `${handlerPath(__dirname)}/handler.emailClientInvoice`,
  events: [
    {
      http: {
        method: "post",
        path: "transactions/emailClientInvoice",
        authorizer: {
          arn: CONFIG.COGNITO.USER_POOL_ARN,
        },
      },
    },
  ],
};
