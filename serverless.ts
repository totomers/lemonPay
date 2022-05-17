import type { AWS } from '@serverless/typescript';
import hello from 'src/lambdas/hello';
import { getAllBusinesses, createBusiness } from 'src/lambdas/business';
import {
  createBusinessAccount,
  verifyUserDetails,
  getVerifiedOnlySecret,
  signInUser,
  logoutUser,
  signUpUser,
  confirmSignUp,
  setInitialPassword,
  resendConfirmationCode,
  getVerificationStatus,
  resetUserPassword,
  // confirmResetUserPassword,
  getUserStatus,
  refreshTokenSignInUser,
  defineAuthChallenge,
  createAuthChallenge,
  verifyAuthChallenge,
  initiateCustomAuthChallenge,
  respondToCustomAuthChallenge,
} from 'src/lambdas/account';
import {
  emailClientInvoice,
  addTransaction,
  getUserTransactions,
} from 'src/lambdas/transaction';
// import dotenv from "dotenv";

// dotenv.config({
//   path: "./config/.env.dev",
// });

const serverlessConfiguration: AWS = {
  service: 'lemonPay',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],

  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-central-1',
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['cognito-identity:*'],
            Resource: '*',
          },
          {
            Effect: 'Allow',
            Action: ['cognito-idp:*'],
            Resource: '*',
          },
          {
            Effect: 'Allow',
            Action: ['ses:SendEmail', 'ses:SendRawEmail'],
            Resource: '*',
          },
        ],
      },
    },
    // vpc: {
    //   securityGroupIds: ["sg-083dfda18e37b6f16"],
    //   subnetIds: [
    //     "subnet-0057d89a2e6d126f4",
    //     "subnet-042ef0140a82af9cd",
    //     "subnet-0e1e25edcf598f0a5",
    //     "subnet-09b199a4edcdc72a3",
    //   ],
    // },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,

      //added this to include all types of binary media data types for image / file uploads
      binaryMediaTypes: ['*/*'],
    },

    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      // DB_URL: "${file(./config.${opt:stage, 'dev'}.json):DB_URL}",
      DB_URL_DEV: '${ssm:/LEMONPAY_DB_URL_DEV}',
      DB_URL_PROD: '${ssm:/LEMONPAY_DB_URL_PROD}',
      EMAIL_ADDRESS: "${file(./config.${opt:stage, 'dev'}.json):EMAIL_ADDRESS}",
      EMAIL_PASSWORD: '${ssm:/lemonpay-email-password}',
      SERVERLESS_REGION:
        "${file(./config.${opt:stage, 'dev'}.json):SERVERLESS_REGION}",
      COGNITO_USER_POOL_ARN:
        "${file(./config.${opt:stage, 'dev'}.json):COGNITO_USER_POOL_ARN}",
      COGNITO_USER_POOL_ID:
        "${file(./config.${opt:stage, 'dev'}.json):COGNITO_USER_POOL_ID}",
      COGNITO_CLIENT_ID:
        "${file(./config.${opt:stage, 'dev'}.json):COGNITO_CLIENT_ID}",
      // COGNITO_USER_DUMMY_PASSWORD:
      //   "${file(./config.${opt:stage, 'dev'}.json):COGNITO_USER_DUMMY_PASSWORD}",
      COGNITO_USER_DUMMY_PASSWORD: '${ssm:/lemonpay-dummy-password}',
      STAGE: "${file(./config.${opt:stage, 'dev'}.json):STAGE}",
      FAKE_CONFIRMATION_CODE_DEV_TESTING:
        "${file(./config.${opt:stage, 'dev'}.json):FAKE_CONFIRMATION_CODE_DEV_TESTING}",
    },
  },

  // import the function via paths
  functions: {
    hello,
    getAllBusinesses,
    createBusiness,
    createBusinessAccount,
    verifyUserDetails,
    getVerifiedOnlySecret,
    signInUser,
    logoutUser,
    signUpUser,
    confirmSignUp,
    setInitialPassword,
    resendConfirmationCode,
    getVerificationStatus,
    emailClientInvoice,
    resetUserPassword,
    // confirmResetUserPassword,
    getUserStatus,
    refreshTokenSignInUser,
    defineAuthChallenge,
    createAuthChallenge,
    verifyAuthChallenge,
    initiateCustomAuthChallenge,
    respondToCustomAuthChallenge,
    addTransaction,
    getUserTransactions,
  },
  package: { individually: true },
  custom: {
    COGNITO_USER_POOL_ARN:
      "${file(./config.${opt:stage, 'dev'}.json):COGNITO_USER_POOL_ARN}",
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  // resources: {
  //   Resources: {
  //     cognitoUserPool: {
  //       Type: "AWS::Cognito::UserPool",
  //       Properties: {
  //         UserPoolName: "${opt:stage, 'dev'}-user-pool",
  //         UsernameAttributes: "email",
  //         AutoVerifiedAttributes: "email",
  //       },
  // },
  // },
  // },
};

module.exports = serverlessConfiguration;
