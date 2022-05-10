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
export const signUpUser = {
  handler: `${handlerPath(__dirname)}/handler.signUpUser`,
  events: [
    {
      http: {
        method: 'post',
        path: 'account/register',
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
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};
// export const confirmResetUserPassword = {
//   handler: `${handlerPath(__dirname)}/handler.confirmResetUserPassword`,
//   events: [
//     {
//       http: {
//         method: "post",
//         path: "account/confirmResetPassword",
//         authorizer: {
//           arn: "${self:custom.COGNITO_USER_POOL_ARN}",
//         },
//       },
//     },
//   ],
// };
export const signInUser = {
  handler: `${handlerPath(__dirname)}/handler.signInUser`,
  events: [
    {
      http: {
        method: 'post',
        path: 'account/signIn',
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
      },
    },
  ],
};
export const getVerificationStatus = {
  handler: `${handlerPath(__dirname)}/handler.getVerificationStatus`,
  events: [
    {
      http: {
        method: 'post',
        path: 'account/getVerificationStatus',
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
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

export const getVerifiedOnlySecret = {
  handler: `${handlerPath(__dirname)}/handler.getVerifiedOnlySecret`,
  events: [
    {
      http: {
        method: 'post',
        path: 'account/getSecret',
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
  role: 'arn:aws:iam::164864435727:role/lambda-email-ses',
  events: [],
};

export const verifyAuthChallenge = {
  handler: `${handlerPath(__dirname)}/handler.verifyAuthChallenge`,
  events: [],
};
export const initiateCustomAuthChallenge = {
  handler: `${handlerPath(__dirname)}/handler.initiateCustomAuthChallenge`,
  events: [
    {
      http: {
        method: 'post',
        path: 'account/initiateAuthChallenge',
      },
    },
  ],
};

export const respondToCustomAuthChallenge = {
  handler: `${handlerPath(__dirname)}/handler.respondToCustomAuthChallenge`,
  events: [
    {
      http: {
        method: 'post',
        path: 'account/respondToAuthChallenge',
      },
    },
  ],
};
