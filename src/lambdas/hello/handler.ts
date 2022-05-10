import type { ValidatedEventAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { formatJSONResponse } from 'src/utils/api-gateway';
import { middyfy } from 'src/utils/lambda';

import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  return formatJSONResponse({
    message: `Helloo ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(hello);
