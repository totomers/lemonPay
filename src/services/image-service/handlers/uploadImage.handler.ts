import * as fileType from 'file-type';
import { v4 as uuid } from 'uuid';
import { S3 } from 'aws-sdk';
import { CustomError, ImageManagerError } from 'src/utils/Errors';
import { CONFIG } from 'src/config';

type Base64EncodedString = string;

const s3 = new S3();

const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];

/**
 *====================================================================================================
 * Upload Image To S3.
 * @param params
 * *====================================================================================================
 */

export async function uploadImageHandler(params: {
  image: Base64EncodedString;
  mime: string;
}): Promise<{ imageUrl: string }> {
  try {
    const { image, mime } = params;
    let imageData = image;
    if (image.substring(0, 7) === 'base64,') {
      imageData = image.substring(7, image.length);
    }

    const buffer = Buffer.from(imageData, 'base64');
    const fileInfo = await fileType.fromBuffer(buffer);
    const detectedExt = fileInfo.ext;
    const detectedMime = fileInfo.mime;

    console.log('file info:  ', fileInfo);

    // if (detectedMime !== mime) {
    //   throw new CustomError('mime types dont match', 400, 400);
    // }

    const name = uuid();
    const key = `${name}.${detectedExt}`;

    console.log(`writing image to bucket called ${key}`);

    console.log('S3 Request:  ', {
      Body: buffer,
      Key: key,
      ContentType: mime,
      Bucket: CONFIG.S3.BUCKET,
      ACL: 'public-read',
    });

    await s3
      .putObject({
        Body: buffer,
        Key: key,
        ContentType: mime,
        Bucket: CONFIG.S3.BUCKET,
        ACL: 'public-read',
      })
      .promise();

    const url = `https://${CONFIG.S3.BUCKET}.s3-${CONFIG.SERVERLESS.REGION}.amazonaws.com/${key}`;
    return {
      imageUrl: url,
    };
  } catch (err) {
    throw new ImageManagerError(err);
  }
}
