const SERVERLESS = {
  REGION: process.env.SERVERLESS_REGION,
};

const COGNITO = {
  CLIENT_ID: process.env.COGNITO_CLIENT_ID,
  USER_POOL_ID: process.env.COGNITO_USER_POOL_ID,
  USER_POOL_ARN: process.env.COGNITO_USER_POOL_ARN,
  // ||"arn:aws:cognito-idp:eu-central-1:164864435727:userpool/eu-central-1_0Mt67WiIq",
};

export const CONFIG = { SERVERLESS, COGNITO };
