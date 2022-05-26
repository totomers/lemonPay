// import { CONFIG } from "src/config";
import { handlerPath } from 'src/utils/handler-resolver';

export const emailReceipt = {
  handler: `${handlerPath(__dirname)}/handler.emailReceipt`,
  events: [
    {
      http: {
        method: 'post',
        path: 'transactions/emailReceipt',
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
export const getTransactionHistory = {
  handler: `${handlerPath(__dirname)}/handler.getTransactionHistory`,
  events: [
    {
      http: {
        method: 'post',
        path: 'transactions/getTransactionHistory',
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};
export const createPhosToken = {
  handler: `${handlerPath(__dirname)}/handler.createPhosToken`,
  events: [
    {
      http: {
        method: 'get',
        path: 'transactions/createPhosToken',
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};

export const validatePhosToken = {
  handler: `${handlerPath(__dirname)}/handler.validatePhosToken`,
  events: [
    {
      http: {
        method: 'post',
        path: 'transactions/validatePhosToken',
      },
    },
  ],
};
