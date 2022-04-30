import type { AWS } from "@serverless/typescript";
import hello from "@functions/hello";
import { getAllBusinesses, createBusiness } from "@functions/business";
import {
  createBusinessAccount,
  verifyUserDetails,
  getVerifiedOnlySecret,
  signInUser,
  signUpUser,
  confirmSignUp,
  setInitialPassword,
  resendConfirmationCode,
  getVerificationStatus,
  resetUserPassword,
  confirmResetUserPassword,
  getUserStatus,
  refreshTokenSignInUser,
  defineAuthChallenge,
  createAuthChallenge,
  verifyAuthChallenge,
} from "@functions/account";
import { emailClientInvoice } from "@functions/transaction";
import dotenv from "dotenv";

dotenv.config({
  path: "./config/.env.dev",
});

const serverlessConfiguration: AWS = {
  service: "lemonPay",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-offline"],

  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "eu-central-1",
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
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      DB_URL: "${file(./config.${opt:stage, 'dev'}.json):DB_URL}",
      USER_POOL_ARN: "${file(./config.${opt:stage, 'dev'}.json):USER_POOL_ARN}",
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
    signUpUser,
    confirmSignUp,
    setInitialPassword,
    resendConfirmationCode,
    getVerificationStatus,
    emailClientInvoice,
    resetUserPassword,
    confirmResetUserPassword,
    getUserStatus,
    refreshTokenSignInUser,
    defineAuthChallenge,
    createAuthChallenge,
    verifyAuthChallenge,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
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
