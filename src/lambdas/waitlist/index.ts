import { handlerPath } from 'src/utils/handler-resolver';

export const addBusinessesFromWaitlist = {
  handler: `${handlerPath(__dirname)}/handler.addBusinessesFromWaitlist`,
  events: [
    {
      http: {
        method: 'post',
        path: 'waitlist/addBusinesses',
        // authorizer: {
        //   arn: '${self:custom.COGNITO_USER_POOL_ARN}',
        // },
      },
    },
  ],
};
