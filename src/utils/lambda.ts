import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import { formatErrorResponse } from './api-gateway';
import { UnprocessableEntityError } from './Errors';

export const middyfy = (handler) => {
  return middy(handler)
    .use(middyJsonBodyParser())
    .onError(() => {
      const error = new UnprocessableEntityError();
      return formatErrorResponse(error);
    });
};
