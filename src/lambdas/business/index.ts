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

// export const createTodo = {
//   handler: `${handlerPath(__dirname)}/handler.createTodo`,
//   events: [
//     {
//       http: {
//         method: "post",
//         path: "todo",
//       },
//     },
//   ],
// };

// export const getTodo = {
//   handler: `${handlerPath(__dirname)}/handler.getTodo`,
//   events: [
//     {
//       http: {
//         method: "get",
//         path: "todo/{id}",
//       },
//     },
//   ],
// };

// export const updateTodo = {
//   handler: `${handlerPath(__dirname)}/handler.updateTodo`,
//   events: [
//     {
//       http: {
//         method: "put",
//         path: "todo/{id}",
//       },
//     },
//   ],
// };

// export const deleteTodo = {
//   handler: `${handlerPath(__dirname)}/handler.deleteTodo`,
//   events: [
//     {
//       http: {
//         method: "delete",
//         path: "todo/{id}",
//       },
//     },
//   ],
// };
