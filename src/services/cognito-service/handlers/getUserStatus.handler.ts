import { AWSCognitoError } from '../common';
import { _getUserFromCognito } from '../utils/_getUserFromCognito';
import { _getCustomAttribute } from '../utils/_getCustomAttr';

/**
 * =======================================================================================================
 * Delete user if he has not changed his dummy password and attempts to sign up with the same email
 * @param params
 * @returns null
 * =======================================================================================================
 */

export async function getUserStatusHandler(params: { email: string }) {
  try {
    const { email } = params;
    const result = await _getUserFromCognito(email);

    if (result instanceof AWSCognitoError) throw result;
    const user = result;
    if (!user || !user.UserAttributes) return;
    console.log('found an exisiting user', user);

    const isUninitiatedAttr = _getCustomAttribute(
      user.UserAttributes,
      'custom:isInitiated'
    );
    const isKnownDetails = _getCustomAttribute(
      user.UserAttributes,
      'custom:isKnownDetails'
    );
    const isVerified = _getCustomAttribute(
      user.UserAttributes,
      'custom:isVerified'
    );
    const isLemonPayAdmin = _getCustomAttribute(
      user.UserAttributes,
      'custom:isLemonPayAdmin'
    );

    return {
      isInitiated: isUninitiatedAttr?.Value === '1',
      isKnownDetails: isKnownDetails?.Value === '1',
      isVerified: isVerified?.Value === '1',
      isLemonPayAdmin: isLemonPayAdmin?.Value === '1',
    };
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}
