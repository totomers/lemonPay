import { handlerPath } from "@libs/handler-resolver";

//consider removing handlerPath and using relative URL instead..
export const createBusinessAccount = {
  handler: `${handlerPath(__dirname)}/handler.createBusinessAccount`,
  events: [
    {
      http: {
        method: "post",
        path: "account/createBusinessAccount",
      },
    },
  ],
};

export const verifyUserDetails = {
  handler: `${handlerPath(__dirname)}/handler.verifyUserDetails`,
  events: [
    {
      http: {
        method: "post",
        path: "account/verifyUser",
      },
    },
  ],
};
export const signUpUser = {
  handler: `${handlerPath(__dirname)}/handler.signUpUser`,
  events: [
    {
      http: {
        method: "post",
        path: "account/signUp",
      },
    },
  ],
};
export const confirmSignUp = {
  handler: `${handlerPath(__dirname)}/handler.confirmSignUp`,
  events: [
    {
      http: {
        method: "post",
        path: "account/confirmSignUp",
      },
    },
  ],
};
export const signInUser = {
  handler: `${handlerPath(__dirname)}/handler.signInUser`,
  events: [
    {
      http: {
        method: "post",
        path: "account/signIn",
      },
    },
  ],
};

export const getVerifiedOnlySecret = {
  handler: `${handlerPath(__dirname)}/handler.getVerifiedOnlySecret`,
  events: [
    {
      http: {
        method: "post",
        path: "account/getSecret",
        authorizer: {
          name: "LemonPayUserOnly",
          arn: "arn:aws:cognito-idp:us-east-1:164864435727:userpool/us-east-1_ijKvraZeK",
        },
      },
    },
  ],
};
export const addUserToGroup = {
  handler: `${handlerPath(__dirname)}/handler.addUserToGroup`,
  events: [
    {
      http: {
        method: "post",
        path: "account/addUserToGroup",
      },
    },
  ],
};

// export const createBusiness = {
//   handler: `${handlerPath(__dirname)}/handler.createBusiness`,
//   events: [
//     {
//       http: {
//         method: "post",
//         path: "businesses/create",
//       },
//     },
//   ],
// };
