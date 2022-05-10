import { AWSError } from 'aws-sdk';
import { MongoError } from 'mongodb';

export const ERROR_TYPES = {
  AWS_COGNITO: 'A',
  AWS_SES: 'B',
  MONGO: 'C',
  FAULTY_PARAMS: 'D',
  UNPROCESSABLE_PARAM_FORMAT: 'D',
  DATA_NOT_FOUND: 'D',
  ADMIN_ONLY: 'D',
  UNKNOWN: 'U',
};

export class CustomError {
  message: string;
  statusCode: number;
  code: string | number;
  type: string;
  name: string;

  constructor(
    message: string,
    statusCode: number,
    code: string | number,
    type?: string,
    name?: string
  ) {
    this.message = message;
    this.statusCode = statusCode;
    this.code = code;
    this.type = type || ERROR_TYPES.UNKNOWN;
    this.name = name;
  }
}

export class MissingParamsError extends CustomError {
  constructor(params: string) {
    super(
      `Missing one of the following: [${params}] in the request's params. Please check request.`,
      400,
      'FaultyParams',
      ERROR_TYPES.FAULTY_PARAMS
    );
  }
}

export class UnprocessableEntityError extends CustomError {
  constructor() {
    super(
      `Content type given to request is defined as JSON but an invalid JSON was provided. Please Check Request Body.`,
      400,
      'UnprocessableParamFormat',
      ERROR_TYPES.UNPROCESSABLE_PARAM_FORMAT
    );
  }
}
export class DataNotFoundError extends CustomError {
  constructor() {
    super(
      `Database retrieved empty data when data is needed for function's future use. Please check credentials entered.`,
      400,
      'DataNotFound',
      ERROR_TYPES.DATA_NOT_FOUND
    );
  }
}
export class AdminOnlyError extends CustomError {
  constructor() {
    super(
      `User attempted to complete an action but is missing admin credentials. Please check your credentials.`,
      401,
      'AdminOnly',
      ERROR_TYPES.ADMIN_ONLY
    );
  }
}

export class MongoCustomError extends CustomError {
  //https://github.com/mongodb/mongo/blob/master/src/mongo/base/error_codes.yml
  constructor(error: MongoError) {
    super(error.message, 500, error.code || error.name, ERROR_TYPES.MONGO);
  }
}

export class AWSCognitoError extends CustomError {
  constructor(error: AWSError) {
    const code = mapCognitoErrorCode(error);
    super(error.message, 500, code, ERROR_TYPES.AWS_COGNITO, error.name);
  }
}

export class AWSSESError extends CustomError {
  constructor(error: AWSError) {
    super(error.message, 500, error.code || error.name, ERROR_TYPES.AWS_SES);
  }
}

function mapCognitoErrorCode(error: AWSError) {
  //28-04-2022 Currently an open issue exists : Cognito does not differentiate the codes of login attemps exceeded vs wrong username or password
  //https://github.com/aws-amplify/amplify-js/issues/1234

  switch (error.code) {
    case 'NotAuthorizedException':
      if (error.message === 'Password attempts exceeded') {
        return ERROR_TYPES.AWS_COGNITO + '01';
      }
      return ERROR_TYPES.AWS_COGNITO + '02';
    case 'UsernameExistsException':
      return ERROR_TYPES.AWS_COGNITO + '03';
    case 'InvalidParameterException':
      return ERROR_TYPES.AWS_COGNITO + '04';
    default:
      return error.code;
  }
}
