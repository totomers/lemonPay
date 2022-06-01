// import { CONFIG } from "src/config";
import { handlerPath } from 'src/utils/handler-resolver';

//consider removing handlerPath and using relative URL instead..
export const getAllBusinesses = {
  handler: `${handlerPath(__dirname)}/handler.getAllBusinesses`,
  events: [
    {
      http: {
        method: 'get',
        path: 'businesses/getAll',
        cors: true,
        authorizer: {
          // name: "LemonPayCognitoAuthorizer",
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};
export const getBusinessDetails = {
  handler: `${handlerPath(__dirname)}/handler.getBusinessDetails`,
  events: [
    {
      http: {
        method: 'get',
        path: 'businesses/getBusinessDetails/{_id}',
        request: { parameters: { paths: { _id: true } } },
        cors: true,
        authorizer: {
          // name: "LemonPayCognitoAuthorizer",
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};

export const createBusiness = {
  handler: `${handlerPath(__dirname)}/handler.createBusiness`,
  events: [
    {
      http: {
        method: 'post',
        path: 'businesses/create',
        authorizer: {
          // name: "LemonPayCognitoAuthorizer",
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};

export const approveBusiness = {
  handler: `${handlerPath(__dirname)}/handler.approveBusiness`,
  events: [
    {
      http: {
        method: 'post',
        path: 'businesses/approve',
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};
export const declineBusiness = {
  handler: `${handlerPath(__dirname)}/handler.declineBusiness`,
  events: [
    {
      http: {
        method: 'post',
        path: 'businesses/decline',
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};
export const updateBusinessStatus = {
  handler: `${handlerPath(__dirname)}/handler.updateBusinessStatus`,
  events: [
    {
      http: {
        method: 'post',
        path: 'businesses/updateBusinessStatus',
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};
