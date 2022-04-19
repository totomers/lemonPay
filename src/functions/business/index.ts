import { handlerPath } from "@libs/handler-resolver";

//consider removing handlerPath and using relative URL instead..
export const getAllBusinesses = {
  handler: `${handlerPath(__dirname)}/handler.getAllBusinesses`,
  events: [
    {
      http: {
        method: "get",
        path: "businesses/getAll",
        authorizer: {
          // name: "LemonPayCognitoAuthorizer",
          arn: "arn:aws:cognito-idp:us-east-1:164864435727:userpool/us-east-1_ijKvraZeK",
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
        method: "post",
        path: "businesses/create",
        authorizer: {
          // name: "LemonPayCognitoAuthorizer",
          arn: "arn:aws:cognito-idp:us-east-1:164864435727:userpool/us-east-1_ijKvraZeK",
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
