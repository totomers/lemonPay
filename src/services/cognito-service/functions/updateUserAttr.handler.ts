import {
  AWS,
  AWSCognitoError,
  cognitoidentityserviceprovider,
  userPoolId,
} from './common';

/**
 * =======================================================================================================
 * Update Cognito Users Attribute
 * @param params
 * =======================================================================================================
 */

export async function updateUserAttributes(params: {
  attributes: AWS.CognitoIdentityServiceProvider.AttributeListType;
  email: string;
}): Promise<
  | AWS.CognitoIdentityServiceProvider.AdminUpdateUserAttributesResponse
  | AWS.AWSError
> {
  try {
    const { attributes, email } = params;

    const updateUserAttributeRequest: AWS.CognitoIdentityServiceProvider.AdminUpdateUserAttributesRequest =
      {
        Username: email,
        UserPoolId: userPoolId,
        UserAttributes: attributes,
      };
    const result = await cognitoidentityserviceprovider
      .adminUpdateUserAttributes(updateUserAttributeRequest)
      .promise();

    return result;
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}
