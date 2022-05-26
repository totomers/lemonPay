import { CognitoService } from 'src/services/cognito.service';
import { AWSCognitoError, CustomError } from 'src/utils/customError';

/**
 * ====================================================================================================
 * Verify new user
 * @param params
 * ====================================================================================================
 */
export async function verifyUserDetailsHandler(params: {
  email: string;
}): Promise<{ isVerified: any }> {
  try {
    const { email } = params;

    //Inject third party service for user identification and await for the response (assume response time is 10 minutes).
    const isVerified = await _verify({});

    await CognitoService.updateUserAttributes({
      email,
      attributes: [{ Name: 'custom:isVerified', Value: '1' }],
    });
    return { isVerified };
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}

async function _verify(user) {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('is verified');
        resolve({ isVerified: true });
      }, 130);
    });
  } catch (err) {
    throw new CustomError(err.message, 500, err.code);
  }
}
