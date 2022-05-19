const SERVERLESS = {
  REGION: process.env.SERVERLESS_REGION,
};

const EMAIL = {
  ADDRESS: process.env.EMAIL_ADDRESS,
  PASSWORD: process.env.EMAIL_PASSWORD,
};

const COGNITO = {
  CLIENT_ID: process.env.COGNITO_CLIENT_ID,
  USER_POOL_ID: process.env.COGNITO_USER_POOL_ID,
  USER_POOL_ARN: process.env.COGNITO_USER_POOL_ARN,
};

const S3 = {
  BUCKET: process.env.S3_BUCKET,
};

export const CONFIG = { SERVERLESS, COGNITO, EMAIL, S3 };
