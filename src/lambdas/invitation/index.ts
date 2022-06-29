import { handlerPath } from 'src/utils/handler-resolver';

export const sendInvitation = {
  handler: `${handlerPath(__dirname)}/handler.sendInvitation`,
  events: [
    {
      http: {
        method: 'post',
        path: 'invitations/sendInvitation',
        authorizer: {
          arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        },
      },
    },
  ],
};
