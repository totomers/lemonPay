import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';
import { CustomError } from 'src/utils/customError';
import { setCookieString } from './setCookieString';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & {
  body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;
export type ParsedAPIGatewayProxyEvent = Omit<APIGatewayProxyEvent, 'body'> & {
  body: { [key: string]: any };
};
export const formatJSONResponse = (body?: any, statusCode?: number) => {
  return {
    statusCode: statusCode || 200,
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
    },
    body: JSON.stringify(body),
  };
};
export const formatJSONResponseWithCookie = (
  body?: any,

  statusCode?: number,
  key?: string,
  value?: string
) => {
  return {
    statusCode: statusCode || 200,
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
      'Set-Cookie': setCookieString(key, value, {
        domain: '*',
        secure: true,
        httpOnly: true,
        path: '*',
      }),
    },
    body: JSON.stringify(body),
  };
};

export const formatErrorResponse = (err: CustomError) => {
  const statusCode = err.statusCode;
  console.log(err);

  delete err.statusCode;
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
    },
    body: JSON.stringify(err),
  };
};
