// import { CONFIG } from "src/config";
import { handlerPath } from 'src/utils/handler-resolver';

//consider removing handlerPath and using relative URL instead..

export const createBusinessAccount = {
  handler: `${handlerPath(__dirname)}/handler.createBusinessAccount`,
  events: [
    {
      http: {
        method: 'post',
        path: 'account/createBusinessAccount',
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};
export const createMockBusinessAccounts = {
  handler: `${handlerPath(__dirname)}/handler.createMockBusinessAccounts`,
  events: [
    {
      http: {
        method: 'post',
        path: 'account/createMockBusinessAccounts',
      },
    },
  ],
};

export const verifyUserDetails = {
  handler: `${handlerPath(__dirname)}/handler.verifyUserDetails`,
  events: [
    {
      http: {
        method: 'post',
        path: 'account/verifyUser',
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};

export const uploadAdminPassport = {
  handler: `${handlerPath(__dirname)}/handler.uploadAdminPassport`,
  events: [
    {
      http: {
        method: 'post',
        path: 'account/uploadAdminPassport',
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};

export const getUser = {
  handler: `${handlerPath(__dirname)}/handler.getUser`,
  events: [
    {
      http: {
        method: 'get',
        path: 'account/getUser',
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};
export const getUserFullDetails = {
  handler: `${handlerPath(__dirname)}/handler.getUserFullDetails`,
  events: [
    {
      http: {
        method: 'get',
        path: 'account/getUserFullDetails',
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};
export const fetchInvitedUser = {
  handler: `${handlerPath(__dirname)}/handler.fetchInvitedUser`,
  events: [
    {
      http: {
        method: 'get',
        path: 'account/fetchInvitedUser',
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};
export const changeUserRole = {
  handler: `${handlerPath(__dirname)}/handler.changeUserRole`,
  events: [
    {
      http: {
        method: 'post',
        path: 'account/changeUserRole',
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};
export const removeUserFromBusiness = {
  handler: `${handlerPath(__dirname)}/handler.removeUserFromBusiness`,
  events: [
    {
      http: {
        method: 'patch',
        path: 'account/removeUserFromBusiness',
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};
