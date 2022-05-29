import { connectToDatabase } from 'src/database/db';
import { User } from 'src/database/models/user';
import { ImageService } from '../../image-service';
import { ImageManagerError, MongoCustomError } from 'src/utils/customError';

/**
 * ====================================================================================================
 * Upload Business Admin's Passport
 * @param params
 * ====================================================================================================
 */
export async function uploadAdminPassportHandler(params: {
  userId: string;
  image: string;
  mime: string;
}): Promise<{}> {
  try {
    await connectToDatabase();
    const { image, mime, userId } = params;
    const result = await ImageService.uploadImageHandler({ image, mime });
    console.log('imageUrl:', result.imageUrl);
    console.log(userId, result.imageUrl);

    await User.findByIdAndUpdate(userId, {
      verificationImage: result.imageUrl,
    });
    //if successful save the url to User Document in MongoDB
    return {};
  } catch (err) {
    console.log(err);
    if (err instanceof ImageManagerError) throw err;
    throw new MongoCustomError(err);
  }
}
