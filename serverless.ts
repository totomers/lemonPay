import type { AWS, AwsLambdaVpcConfig } from '@serverless/typescript';
import hello from 'src/lambdas/hello';
import {
  getAllBusinesses,
  createBusiness,
  getBusinessDetails,
  approveBusiness,
  declineBusiness,
  updateBusinessStatus,
  getBusinessCatalogs,
  getAutocomplete,
  addReferrer,
  getBusinessesToBeRewarded,
  addBusinessesFromWaitlist,
  getBusinessUsers,
} from 'src/lambdas/business';

import { sendInvitation } from 'src/lambdas/invitation';
import { getCatalog, updateCatalog, createCatalog } from 'src/lambdas/catalog';
import {
  createBusinessAccount,
  createMockBusinessAccounts,
  verifyUserDetails,
  uploadAdminPassport,
  getUser,
  getUserFullDetails,
  fetchInvitedUser,
  changeUserRole,
  removeUserFromBusiness,
} from 'src/lambdas/account';
import {
  signInUser,
  logoutUser,
  signUpUser,
  confirmSignUp,
  setInitialPassword,
  resendConfirmationCode,
  resetUserPassword,
  getUserStatus,
  refreshTokenSignInUser,
  defineAuthChallenge,
  createAuthChallenge,
  verifyAuthChallenge,
  initiateAuthChallengeWithEmail,
  initiateAuthChallengeWithToken,
  respondToCustomAuthChallenge,
  respondToSignInAuthChallenge,
  signInLemonPayAdmin,
  createLemonPayAdmin,
} from 'src/lambdas/cognito';
import {
  emailReceipt,
  addTransaction,
  getBusinessTransactionsHistory,
  createPhosToken,
  validatePhosToken,
  createMockTransactions,
  getUserTransactionsHistory,
} from 'src/lambdas/transaction';

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
          {
            Effect: 'Allow',
            Action: ['s3:*'],
            Resource: '*',
          },
          {
            Effect: 'Allow',
            Action: ['ssm:DescribeParameters'],
            Resource: '*',
          },
          {
            Effect: 'Allow',
            Action: [
              'ssm:GetParameters',
              'ssm:GetParameter*',
              'ssm:GetParametersByPath',
            ],
            Resource: '*',
          },
          {
            Effect: 'Allow',
            Action: ['kms:Decrypt'],
            Resource: '*',
          },
        ],
      },
    },

    vpc: '${self:custom.VPC}' as unknown as AwsLambdaVpcConfig,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,

      //added this to include all types of binary media data types for image / file uploads
      binaryMediaTypes: ['*/*'],
    },

    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
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
      COGNITO_USER_DUMMY_PASSWORD: '${ssm:/lemonpay-dummy-password}',
      PHOS_TOKEN_GEN_SECRET: '${ssm:/lemonpay-phos-gen-token-secret}',
      PHOS_PRE_SHARED_SECRET: '${ssm:/lemonpay-phos-pre-shared-secret}',
      STAGE: "${file(./config.${opt:stage, 'dev'}.json):STAGE}",
      FAKE_CONFIRMATION_CODE_DEV_TESTING:
        "${file(./config.${opt:stage, 'dev'}.json):FAKE_CONFIRMATION_CODE_DEV_TESTING}",
      S3_IMAGES_BUCKET_NAME: '${self:custom.S3_BUCKET_NAME}',
    },
  },

  // import the function via paths
  functions: {
    hello,
    getAllBusinesses,
    createBusiness,
    createBusinessAccount,
    verifyUserDetails,
    signInUser,
    logoutUser,
    signUpUser,
    confirmSignUp,
    setInitialPassword,
    resendConfirmationCode,
    emailReceipt,
    resetUserPassword,
    uploadAdminPassport,
    getUser,
    getUserFullDetails,
    getUserStatus,
    refreshTokenSignInUser,
    defineAuthChallenge,
    createAuthChallenge,
    verifyAuthChallenge,
    initiateAuthChallengeWithEmail,
    initiateAuthChallengeWithToken,
    respondToCustomAuthChallenge,
    respondToSignInAuthChallenge,
    addTransaction,
    createMockTransactions,
    getBusinessTransactionsHistory,
    getUserTransactionsHistory,
    createPhosToken,
    validatePhosToken,
    getBusinessDetails,
    addReferrer,
    approveBusiness,
    declineBusiness,
    updateBusinessStatus,
    getAutocomplete,
    signInLemonPayAdmin,
    createLemonPayAdmin,
    getBusinessCatalogs,
    getCatalog,
    updateCatalog,
    createCatalog,
    addBusinessesFromWaitlist,
    getBusinessesToBeRewarded,
    createMockBusinessAccounts,
    sendInvitation,
    fetchInvitedUser,
    getBusinessUsers,
    changeUserRole,
    removeUserFromBusiness,
  },
  package: { individually: true },
  custom: {
    VPC: "${file(./config.${opt:stage, 'dev'}.json):VPC}",
    COGNITO_USER_POOL_ARN:
      "${file(./config.${opt:stage, 'dev'}.json):COGNITO_USER_POOL_ARN}",
    S3_BUCKET_NAME: "${file(./config.${opt:stage, 'dev'}.json):S3_BUCKET_NAME}",
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
  resources: {
    Resources: {
      ImageUploadBucket: {
        Type: 'AWS::S3::Bucket',
        Properties: {
          BucketName: '${self:custom.S3_BUCKET_NAME}',
          AccessControl: 'PublicRead',
        },
      },

      GatewayResponseDefault4XX: {
        Type: 'AWS::ApiGateway::GatewayResponse',
        Properties: {
          ResponseParameters: {
            'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
            'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
            // 'gatewayresponse.header.Access-Control-Allow-Methods': "'*'",
          },
          ResponseType: 'DEFAULT_4XX',
          RestApiId: { Ref: 'ApiGatewayRestApi' },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
