import { AccountService } from '../../services/account-service';
import { MissingParamsError } from 'src/utils/customError';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { Context } from 'aws-lambda';

/**
 * =======================================================================================================
 * Verify User Details
 * =======================================================================================================
 */
export async function verifyUserDetails(
  event: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    // TBD: If verification method will need to use a file/image we will use the getFile(event) method below:
    // const file = getFile(event);
    const email = event.requestContext.authorizer?.claims?.email;
    const { image, mime } = event.body;
    if (!image || !mime) throw new MissingParamsError('image, mime');

    const data = await AccountService.verifyUserDetailsHandler({
      email,
    });
    return { data };
  } catch (err) {
    return { err };
  }
}

/**
 * Extract the file from the lambda event.
 * @param event
 * @returns
 */
function getFile(event: ParsedAPIGatewayProxyEvent) {
  const body = event.body;
  console.log('event: ', event);

  const fileName = body
    .split('\r\n')[1]
    .split(';')[2]
    .split('=')[1]
    .replace(/^"|"$/g, '')
    .trim();
  const fileType = fileName.split('.')[1];
  const fileContent = body.split('\r\n')[5].trim();

  console.log('file name', fileName);
  console.log('file type', fileType);
  // console.log("file content", fileContent);
  return fileContent;
}
