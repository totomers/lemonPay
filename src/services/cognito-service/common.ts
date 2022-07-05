import aws from 'aws-sdk';
import { CONFIG } from 'src/config';
import { AWSCognitoError as _AWSCognitoError } from '../../utils/Errors';
import { CustomError as _CustomError } from '../../utils/Errors';

aws.config.update({ region: CONFIG.SERVERLESS.REGION });
export const AWS = aws;

export const userPoolId = CONFIG.COGNITO.USER_POOL_ID;
export const clientId = CONFIG.COGNITO.CLIENT_ID;

export const cognitoidentityserviceprovider =
  new AWS.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
  });

export const AWSCognitoError = _AWSCognitoError;
export const CustomError = _CustomError;
