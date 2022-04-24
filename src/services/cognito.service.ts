import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1" });
const userPoolId = process.env.COGNITO_USER_POOL_ID;
const clientId = process.env.COGNITO_CLIENT_ID;

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
  apiVersion: "2016-04-18",
});

/**
 * Create new user
 * @param params
 */

export async function signUpCognitoHandler(params: {
  name: string;
  email: string;
  // password: string;
}): Promise<AWS.CognitoIdentityServiceProvider.SignUpResponse | AWS.AWSError> {
  try {
    // await connectToDatabase();
    const { email, name } = params;

    await overrideUninitiatedUser({ email });

    const signUpRequest: AWS.CognitoIdentityServiceProvider.SignUpRequest = {
      Username: email,
      Password: process.env.COGNITO_USER_DUMMY_PASSWORD,
      ClientId: clientId,
      UserAttributes: [
        {
          Name: "name",
          Value: name,
        },
        {
          Name: "email",
          Value: email,
        },
        {
          Name: "custom:isInitiated",
          Value: "0",
        },
      ],
    };
    const result = await cognitoidentityserviceprovider
      .signUp(signUpRequest)
      .promise();

    return result;
  } catch (err) {
    throw err;
  }
}

/**
 *
 * @param params
 * @returns null
 */

export async function overrideUninitiatedUser(params: { email: string }) {
  try {
    const { email } = params;

    const getUserRequest: AWS.CognitoIdentityServiceProvider.AdminGetUserRequest =
      {
        Username: email,
        UserPoolId: userPoolId,
      };
    const user = await cognitoidentityserviceprovider
      .adminGetUser(getUserRequest)
      .promise();
    if (!user) return;
    console.log("found an exisiting user", user);

    const isUninitiatedAttr = _getCustomAttribute(
      user.UserAttributes,
      "custom:isInitiated"
    );

    if (isUninitiatedAttr.Value === "0") {
      console.log("USER IS NOT INITIATED!");
      const adminDeleteUserRequest: AWS.CognitoIdentityServiceProvider.AdminDeleteUserRequest =
        { UserPoolId: userPoolId, Username: email };
      await cognitoidentityserviceprovider
        .adminDeleteUser(adminDeleteUserRequest)
        .promise();
    }
  } catch (err) {
    return err;
    // throw err;
  }
}

/**
 *
 * @param userAttributes
 * @param customAttribute
 * @returns AWS User Attribute
 */

function _getCustomAttribute(
  userAttributes: AWS.CognitoIdentityServiceProvider.AttributeListType,
  customAttribute: string
) {
  return userAttributes.find((attr) => attr.Name === customAttribute);
}

/**
 * Update Cognito Users Attribute
 * @param params
 */

export async function updateUserAttribute(params: {
  name: string;
  value: string;
  email: string;
}): Promise<
  | AWS.CognitoIdentityServiceProvider.AdminUpdateUserAttributesResponse
  | AWS.AWSError
> {
  try {
    const { name, value, email } = params;

    const updateUserAttributeRequest: AWS.CognitoIdentityServiceProvider.AdminUpdateUserAttributesRequest =
      {
        Username: email,
        UserPoolId: userPoolId,
        UserAttributes: [
          {
            Name: name,
            Value: value,
          },
        ],
      };
    const result = await cognitoidentityserviceprovider
      .adminUpdateUserAttributes(updateUserAttributeRequest)
      .promise();

    return result;
  } catch (err) {
    throw err;
  }
}

/**
 * Resend OTP to users email for confirmation
 * @param params
 */

export async function resendConfirmationCodeHandler(params: {
  email: string;
}): Promise<AWS.CognitoIdentityServiceProvider.ConfirmSignUpResponse> {
  try {
    const { email } = params;

    const resendConfirmationCodeRequest: AWS.CognitoIdentityServiceProvider.ResendConfirmationCodeRequest =
      {
        Username: email,
        ClientId: clientId,
      };
    const result = await cognitoidentityserviceprovider
      .resendConfirmationCode(resendConfirmationCodeRequest)
      .promise();

    return result;
  } catch (err) {
    throw err;
  }
}

/**
 * Confirm new users email
 * @param params
 */

export async function confirmSignUpCognitoHandler(params: {
  email: string;
  confirmationCode: string;
}): Promise<AWS.CognitoIdentityServiceProvider.ConfirmSignUpResponse> {
  try {
    // await connectToDatabase();
    const { email, confirmationCode } = params;

    const confirmSignUpRequest: AWS.CognitoIdentityServiceProvider.ConfirmSignUpRequest =
      {
        Username: email,
        ConfirmationCode: confirmationCode,
        ClientId: clientId,
      };
    const result = await cognitoidentityserviceprovider
      .confirmSignUp(confirmSignUpRequest)
      .promise();

    //validate if confirmation was successful, if so then add the user to the unverified group (limited access)
    await addUserToGroupCognitoHandler({ groupName: "unverified", email });

    return result;
  } catch (err) {
    console.error(err);

    throw err;
  }
}

export async function setInitialUserPasswordHandler(params: {
  email;
  accessToken: string;
  password: string;
}): Promise<
  AWS.CognitoIdentityServiceProvider.ChangePasswordResponse | AWS.AWSError
> {
  try {
    const { email, accessToken, password } = params;

    console.log("old password", process.env.COGNITO_USER_DUMMY_PASSWORD);

    const changePasswordRequest: AWS.CognitoIdentityServiceProvider.ChangePasswordRequest =
      {
        AccessToken: accessToken,
        PreviousPassword: process.env.COGNITO_USER_DUMMY_PASSWORD,
        ProposedPassword: password,
      };
    const result = await cognitoidentityserviceprovider
      .changePassword(changePasswordRequest)
      .promise();

    await updateUserAttribute({
      email,
      name: "custom:isInitiated",
      value: "1",
    });
    return result;
  } catch (err) {
    throw err;
  }
}

/**
 * Sign in existing user
 * @param params
 */

export async function signInCognitoHandler(params: {
  email: string;
  password: string;
}): Promise<AWS.CognitoIdentityServiceProvider.InitiateAuthResponse> {
  try {
    // await connectToDatabase();
    const { email, password } = params;

    const result = cognitoidentityserviceprovider
      .initiateAuth({
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: clientId,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      })
      .promise();

    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/**
 *  Add User To Group With Unique Permissions
 * @param params
 */

export async function addUserToGroupCognitoHandler(params: {
  groupName: "verified" | "unverified";
  email: string;
}): Promise<{ addToGroup: boolean }> {
  try {
    // await connectToDatabase();
    const { email, groupName } = params;

    const cognitoidentityserviceprovider =
      new AWS.CognitoIdentityServiceProvider();

    await cognitoidentityserviceprovider
      .adminAddUserToGroup({
        UserPoolId: userPoolId,
        GroupName: groupName,
        Username: email,
      })
      .promise();

    return { addToGroup: true };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/**
 *  Add User To Group With Unique Permissions
 * @param params
 */

export async function getVerificationStatusHandler(params: {
  email: string;
}): Promise<{ status: "Verified" | "Pending" }> {
  try {
    //HERE WE WILL CHECK IF THE USER IS IN THE GROUP "VERIFIED" OR "UNVERIFIED" AD RETURN EITHER "PENDING" OR "CREATED"

    const { email } = params;
    const AdminListGroupsForUserRequest: AWS.CognitoIdentityServiceProvider.AdminListGroupsForUserRequest =
      { Username: email, UserPoolId: userPoolId };

    const userGroups = await cognitoidentityserviceprovider
      .adminListGroupsForUser(AdminListGroupsForUserRequest)
      .promise();

    console.log("user groups", userGroups.Groups);
    const isUserVerified = userGroups.Groups.find(
      (g) => g.GroupName === "verified"
    );

    return { status: isUserVerified ? "Verified" : "Pending" };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const CognitoService = {
  signUpCognitoHandler,
  resendConfirmationCodeHandler,
  confirmSignUpCognitoHandler,
  signInCognitoHandler,
  addUserToGroupCognitoHandler,
  setInitialUserPasswordHandler,
  getVerificationStatusHandler,
};
