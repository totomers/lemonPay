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
export const addReferrerToUser = {
  handler: `${handlerPath(__dirname)}/handler.addReferrerToUser`,
  events: [
    {
      http: {
        method: 'post',
        path: 'account/addReferrerToUser',
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
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
export const signUpUser = {
  handler: `${handlerPath(__dirname)}/handler.signUpUser`,
  events: [
    {
      http: {
        method: 'post',
        path: 'account/register',
        cors: true,
      },
    },
  ],
};
export const resendConfirmationCode = {
  handler: `${handlerPath(__dirname)}/handler.resendConfirmationCode`,
  events: [
    {
      http: {
        method: 'post',
        path: 'account/resendotp',
      },
    },
  ],
};
export const confirmSignUp = {
  handler: `${handlerPath(__dirname)}/handler.confirmSignUp`,
  events: [
    {
      http: {
        method: 'post',
        path: 'account/submitotp',
      },
    },
  ],
};
export const setInitialPassword = {
  handler: `${handlerPath(__dirname)}/handler.setInitialPassword`,
  events: [
    {
      http: {
        method: 'post',
        path: 'account/setInitialPassword',
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};
export const resetUserPassword = {
  handler: `${handlerPath(__dirname)}/handler.resetUserPassword`,
  events: [
    {
      http: {
        method: 'post',
        path: 'account/resetPassword',
        // authorizer: {
        //   arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        // },
      },
    },
  ],
};

export const signInUser = {
  handler: `${handlerPath(__dirname)}/handler.signInUser`,
  events: [
    {
      http: {
        method: 'post',
        path: 'account/signIn',
        cors: true,
      },
    },
  ],
};

export const refreshTokenSignInUser = {
  handler: `${handlerPath(__dirname)}/handler.refreshTokenSignInUser`,
  events: [
    {
      http: {
        method: 'post',
        path: 'account/refreshTokenSignIn',
        cors: true,
      },
    },
  ],
};
export const logoutUser = {
  handler: `${handlerPath(__dirname)}/handler.logoutUser`,
  events: [
    {
      http: {
        method: 'post',
        path: 'account/logout',
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
        cors: true,
      },
    },
  ],
};

export const getUserStatus = {
  handler: `${handlerPath(__dirname)}/handler.getUserStatus`,
  events: [
    {
      http: {
        method: 'post',
        path: 'account/userStatus',
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
export const getBusinessAdminList = {
  handler: `${handlerPath(__dirname)}/handler.getBusinessAdminList`,
  events: [
    {
      http: {
        method: 'get',
        path: 'account/getBusinessAdminList',
        cors: {
          origin: '*',
          headers: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
          allowCredentials: false,
        },
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};

export const defineAuthChallenge = {
  handler: `${handlerPath(__dirname)}/handler.defineAuthChallenge`,
  events: [],
};

export const createAuthChallenge = {
  handler: `${handlerPath(__dirname)}/handler.createAuthChallenge`,
  // role: 'arn:aws:iam::164864435727:role/lambda-email-ses',
  events: [],
};

export const verifyAuthChallenge = {
  handler: `${handlerPath(__dirname)}/handler.verifyAuthChallenge`,
  events: [],
};
export const initiateAuthChallengeWithEmail = {
  handler: `${handlerPath(__dirname)}/handler.initiateAuthWithEmail`,
  events: [
    {
      http: {
        method: 'post',
        path: 'account/initiateAuthWithEmail',
      },
    },
  ],
};
export const initiateAuthChallengeWithToken = {
  handler: `${handlerPath(__dirname)}/handler.initiateAuthWithToken`,
  events: [
    {
      http: {
        method: 'get',
        path: 'account/initiateAuthWithToken',
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};

export const respondToSignInAuthChallenge = {
  handler: `${handlerPath(__dirname)}/handler.respondToSignInChallenge`,
  events: [
    {
      http: {
        method: 'post',
        path: 'account/respondToSignInChallenge',
        cors: true,
      },
    },
  ],
};

export const respondToCustomAuthChallenge = {
  handler: `${handlerPath(__dirname)}/handler.respondToResetPassChallenge`,
  events: [
    {
      http: {
        method: 'post',
        path: 'account/respondToResetPassChallenge',
      },
    },
  ],
};
