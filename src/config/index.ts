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
  CUSTOM_AUTH_TYPE: { LOGIN: 'LOGIN', RESETPASS: 'RESETPASS' },
};

const S3 = {
  BUCKET: process.env.S3_IMAGES_BUCKET_NAME,
};

const PHOS = {
  TOKEN_GEN_SECRET: process.env.PHOS_TOKEN_GEN_SECRET,
  PRE_SHARED_SECRET: process.env.PHOS_PRE_SHARED_SECRET,
};
const KVK = {
  TOKEN: 'l7ca3ee185bcdf4541be22d08b9cb839ba',
};

const PROMOTION_TYPES = {
  REFERRED_BY_BUSINESS: 'referredByBusiness' as 'referredByBusiness',
  REFERRED_A_BUSINESS: 'referredABusiness' as 'referredABusiness',
};

export const CONFIG = {
  SERVERLESS,
  COGNITO,
  EMAIL,
  S3,
  PHOS,
  KVK,
  PROMOTION_TYPES,
};
