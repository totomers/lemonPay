import { Context } from 'aws-lambda';
import { AccountService } from 'src/services/account-service';
import { ParsedAPIGatewayProxyEvent } from 'src/utils/api-gateway';
import { MissingParamsError } from 'src/utils/Errors';

/**
 * =======================================================================================================
 * Upload Admin's Passport To S3 & Save Url To DB
 * =======================================================================================================
 */
export async function uploadAdminPassport(
  event?: ParsedAPIGatewayProxyEvent,
  context?: Context
) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { userId, image, mime } = event.body;

    if (!userId || !image || !mime)
      throw new MissingParamsError('userId, image, mime');

    const data = await AccountService.uploadAdminPassportHandler({
      userId,
      image,
      mime,
    });
    return { data };
  } catch (err) {
    console.log(err);

    return { err };
  }
}
