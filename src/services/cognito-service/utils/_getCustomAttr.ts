/**
 *=======================================================================================================
 * @param userAttributes
 * @param customAttribute
 * @returns AWS User Attribute
 * =======================================================================================================
 */

export function _getCustomAttribute(
  userAttributes: AWS.CognitoIdentityServiceProvider.AttributeListType,
  customAttribute: string
) {
  return userAttributes.find((attr) => attr.Name === customAttribute);
}
