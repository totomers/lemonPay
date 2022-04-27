import { AWSError } from "aws-sdk";
import { MongoError } from "mongodb";

export const ERROR_TYPES = {
  AWS_COGNITO: "A",
  AWS_SES: "B",
  MONGO: "C",
  FAULTY_PARAMS: "D",
  UNPROCESSABLE_PARAM_FORMAT: "E",
  UNKNOWN: "U",
};

export class CustomError {
  message: string;
  statusCode: number;
  code: string | number;
  type: string;

  constructor(
    message: string,
    statusCode: number,
    code: string | number,
    type?: string
  ) {
    this.message = message;
    this.statusCode = statusCode;
    this.code = code;
    this.type = type || ERROR_TYPES.UNKNOWN;
  }
}

export class MissingParamsError extends CustomError {
  constructor(params: string) {
    super(
      `Missing one of the following: [${params}] in the request's params. Please check request.`,
      400,
      400,
      ERROR_TYPES.FAULTY_PARAMS
    );
  }
}

export class UnprocessableEntityError extends CustomError {
  constructor() {
    super(
      `Content type given to request is defined as JSON but an invalid JSON was provided. Please Check Request Body.`,
      400,
      400,
      ERROR_TYPES.UNPROCESSABLE_PARAM_FORMAT
    );
  }
}

export class MongoCustomError extends CustomError {
  constructor(error: MongoError) {
    console.log(error.message);

    super(error.message, 500, error.code || error.name, ERROR_TYPES.MONGO);
  }
}

export class AWSCognitoError extends CustomError {
  constructor(error: AWSError) {
    // const code = error.code === "NotAuthorizedException" ? "101" : error.code;
    console.log(error);

    const code = mapCognitoErrorCode(error);
    super(error.message, 500, code, ERROR_TYPES.AWS_COGNITO);
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

  if (error.message === "Password attempts exceeded") {
    return ERROR_TYPES.AWS_COGNITO + "01";
  }
  switch (error.code) {
    case "NotAuthorizedException":
      return ERROR_TYPES.AWS_COGNITO + "02";
    default:
      return error.code;
  }
}
