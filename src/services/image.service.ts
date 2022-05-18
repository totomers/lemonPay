import * as fileType from 'file-type';
import { v4 as uuid } from 'uuid';
import * as AWS from 'aws-sdk';
import { CustomError, ImageManagerError } from 'src/utils/customError';

type Base64EncodedString = string;

const s3 = new AWS.S3();

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
}): Promise<{ imageUrl: string } | AWS.AWSError> {
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

    if (detectedMime !== mime) {
      throw new CustomError('mime types dont match', 400, 400);
    }

    const name = uuid();
    const key = `${name}.${detectedExt}`;

    console.log(`writing image to bucket called ${key}`);

    await s3
      .putObject({
        Body: buffer,
        Key: key,
        ContentType: mime,
        Bucket: process.env.imageUploadBucket,
        ACL: 'public-read',
      })
      .promise();

    const url = `https://${process.env.imageUploadBucket}.s3-${process.env.region}.amazonaws.com/${key}`;
    return {
      imageUrl: url,
    };
  } catch (err) {
    throw new ImageManagerError(err);
  }
}

export const ImageService = {
  uploadImageHandler,
};
