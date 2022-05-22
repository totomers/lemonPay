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
  BUCKET: process.env.S3_IMAGES_BUCKET_NAME,
};

const PHOS = {
  TOKEN_GEN_SECRET: process.env.PHOS_TOKEN_GEN_SECRET,
  PRE_SHARED_SECRET: process.env.PHOS_PRE_SHARED_SECRET,
};
export const CONFIG = {
  SERVERLESS,
  COGNITO,
  EMAIL,
  S3,
  PHOS,
};
