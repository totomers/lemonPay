import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';
import { CustomError } from 'src/utils/customError';

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
      'Access-Control-Allow-Origin': 'https://www.example.com',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
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
