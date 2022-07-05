import { handlerPath } from 'src/utils/handler-resolver';

export const redeemCode = {
  handler: `${handlerPath(__dirname)}/handler.redeemCode`,
  events: [
    {
      http: {
        method: 'post',
        path: 'promotions/redeemCode',
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};
export const updatePromotionsStatus = {
  handler: `${handlerPath(__dirname)}/handler.updatePromotionsStatus`,
  events: [
    {
      http: {
        method: 'patch',
        path: 'promotions/updatePromotionsStatus',
        cors: true,
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};
