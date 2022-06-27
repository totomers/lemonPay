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
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};
export const getBusinessCatalogs = {
  handler: `${handlerPath(__dirname)}/handler.getBusinessCatalogs`,
  events: [
    {
      http: {
        method: 'get',
        path: 'businesses/getBusinessCatalogs',
        cors: true,
        authorizer: {
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
export const getAutocomplete = {
  handler: `${handlerPath(__dirname)}/handler.getAutocomplete`,

  events: [
    {
      http: {
        method: 'get',
        path: 'businesses/getAutocomplete/',
        request: {
          parameters: {
            querystrings: { name: true },
            // paths: { name: true },
          },
        },
        cors: true,
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

export const addReferrer = {
  handler: `${handlerPath(__dirname)}/handler.addReferrer`,
  events: [
    {
      http: {
        method: 'post',
        path: 'businesses/addReferrer',
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};

export const getBusinessesToBeRewarded = {
  handler: `${handlerPath(__dirname)}/handler.getBusinessesToBeRewarded`,
  events: [
    {
      http: {
        method: 'get',
        path: 'businesses/toBeRewarded',
        cors: true,
        authorizer: {
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
        method: 'patch',
        path: 'businesses/approve',
        cors: true,
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
        method: 'patch',
        path: 'businesses/decline',
        cors: true,
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
        method: 'patch',
        path: 'businesses/updateBusinessStatus',
        cors: true,
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};

export const addBusinessesFromWaitlist = {
  handler: `${handlerPath(__dirname)}/handler.addBusinessesFromWaitlist`,
  events: [
    {
      http: {
        method: 'post',
        path: 'waitlist/addBusinesses',
        // authorizer: {
        //   arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        // },
      },
    },
  ],
};
