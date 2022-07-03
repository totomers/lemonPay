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

//TBD: How do we secure this endpoint and verify that it is made by PHOS

export const addTransaction = {
  handler: `${handlerPath(__dirname)}/handler.addTransaction`,
  events: [
    {
      http: {
        method: 'post',
        path: 'transactions/addTransaction',
        // authorizer: {
        //   arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        // },
      },
    },
  ],
};
export const createMockTransactions = {
  handler: `${handlerPath(__dirname)}/handler.createMockTransactions`,
  events: [
    {
      http: {
        method: 'post',
        path: 'transactions/createMockTransactions',
        // authorizer: {
        //   arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        // },
      },
    },
  ],
};
export const getBusinessTransactionsHistory = {
  handler: `${handlerPath(__dirname)}/handler.getBusinessTransactionsHistory`,
  events: [
    {
      http: {
        method: 'get',
        path: 'transactions/getBusinessTransactionsHistory',
        request: {
          parameters: {
            querystrings: { businessId: true },
          },
        },
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};
export const getUserTransactionsHistory = {
  handler: `${handlerPath(__dirname)}/handler.getUserTransactionsHistory`,
  events: [
    {
      http: {
        method: 'get',
        path: 'transactions/getUserTransactionsHistory',
        request: {
          parameters: {
            querystrings: { businessId: true, userId: true },
          },
        },
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
