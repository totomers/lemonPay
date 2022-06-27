import { handlerPath } from 'src/utils/handler-resolver';

export const signUpUser = {
  handler: `${handlerPath(__dirname)}/handler.signUpUser`,
  vpc: '~' as null,
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
  vpc: '~' as null,
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
  vpc: '~' as null,
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
  vpc: '~' as null,
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
  vpc: '~' as null,
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
  vpc: '~' as null,
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
  vpc: '~' as null,
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
  vpc: '~' as null,
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

export const defineAuthChallenge = {
  handler: `${handlerPath(__dirname)}/handler.defineAuthChallenge`,
  vpc: '~' as null,
  events: [],
};

export const createAuthChallenge = {
  handler: `${handlerPath(__dirname)}/handler.createAuthChallenge`,
  vpc: '~' as null,
  // role: 'arn:aws:iam::164864435727:role/lambda-email-ses',
  events: [],
};

export const verifyAuthChallenge = {
  handler: `${handlerPath(__dirname)}/handler.verifyAuthChallenge`,
  vpc: '~' as null,
  events: [],
};
export const initiateAuthChallengeWithEmail = {
  handler: `${handlerPath(__dirname)}/handler.initiateAuthWithEmail`,
  vpc: '~' as null,
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
  vpc: '~' as null,
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
  vpc: '~' as null,
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
  vpc: '~' as null,
  events: [
    {
      http: {
        method: 'post',
        path: 'account/respondToResetPassChallenge',
      },
    },
  ],
};

export const createLemonPayAdmin = {
  handler: `${handlerPath(__dirname)}/handler.createLemonPayAdmin`,
  vpc: '~' as null,
  events: [
    {
      http: {
        method: 'post',
        path: 'account/createLemonPayAdmin',
      },
    },
  ],
};

export const signInLemonPayAdmin = {
  handler: `${handlerPath(__dirname)}/handler.signInLemonPayAdmin`,
  vpc: '~' as null,
  events: [
    {
      http: {
        method: 'post',
        path: 'account/signInLemonPayAdmin',
        cors: true,
      },
    },
  ],
};
