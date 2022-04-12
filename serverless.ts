import type { AWS } from "@serverless/typescript";
import hello from "@functions/hello";
import { getAllBusinesses, createBusiness } from "@functions/businesses";
import dotenv from "dotenv";

dotenv.config({
  path: "./config/.env.dev",
});
console.log("process.env.DB_URL:  ", process.env.DB_URL);

const serverlessConfiguration: AWS = {
  service: "server",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-offline"],

  provider: {
    name: "aws",
    runtime: "nodejs14.x",

    vpc: {
      securityGroupIds: ["sg-083dfda18e37b6f16"],
      subnetIds: [
        "subnet-0057d89a2e6d126f4",
        "subnet-042ef0140a82af9cd",
        "subnet-0e1e25edcf598f0a5",
        "subnet-09b199a4edcdc72a3",
      ],
    },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      DB_URL: "${file(./config.${opt:stage, 'dev'}.json):DB_URL}",
    },
  },
  // import the function via paths
  functions: { hello, getAllBusinesses, createBusiness },
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
};

module.exports = serverlessConfiguration;
