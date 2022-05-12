// import { CONFIG } from "src/config";
import { handlerPath } from 'src/utils/handler-resolver';

export const emailClientInvoice = {
  handler: `${handlerPath(__dirname)}/handler.emailClientInvoice`,
  events: [
    {
      http: {
        method: 'post',
        path: 'transactions/emailClientInvoice',
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};

export const addTransaction = {
  handler: `${handlerPath(__dirname)}/handler.addTransaction`,
  events: [
    {
      http: {
        method: 'post',
        path: 'transactions/addTransaction',
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};
export const getUserTransactions = {
  handler: `${handlerPath(__dirname)}/handler.getUserTransactions`,
  events: [
    {
      http: {
        method: 'post',
        path: 'transactions/getUserTransactions',
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};
