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
