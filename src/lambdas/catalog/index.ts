// import { CONFIG } from "src/config";

import { handlerPath } from 'src/utils/handler-resolver';

export const getCatalog = {
  handler: `${handlerPath(__dirname)}/handler.getCatalog`,
  events: [
    {
      http: {
        method: 'get',
        path: 'catalogs/getCatalog/{_id}',
        request: { parameters: { paths: { _id: true } } },
        cors: true,
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};

export const createCatalog = {
  handler: `${handlerPath(__dirname)}/handler.createCatalog`,
  events: [
    {
      http: {
        method: 'post',
        path: 'catalogs/create',
        cors: true,
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};
export const updateCatalog = {
  handler: `${handlerPath(__dirname)}/handler.updateCatalog`,
  events: [
    {
      http: {
        method: 'patch',
        path: 'catalogs/update',
        cors: true,
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};
