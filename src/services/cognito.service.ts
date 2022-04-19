import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1" });
const userPoolId = process.env.COGNITO_USER_POOL_ID || "us-east-1_ijKvraZeK";
const clientId = process.env.COGNITO_CLIENT_ID || "1u9gv0k7mjgls8p1i2rpm41ko3";

/**
 * Create new user
 * @param params
 */

export async function signUpCognitoHandler(params: {
  name: string;
  email: string;
  password: string;
}): Promise<AWS.CognitoIdentityServiceProvider.SignUpResponse | AWS.AWSError> {
  try {
    // await connectToDatabase();
    const { email, name, password } = params;

    const cognitoidentityserviceprovider =
      new AWS.CognitoIdentityServiceProvider({
        apiVersion: "2016-04-18",
      });

    const signUpRequest: AWS.CognitoIdentityServiceProvider.SignUpRequest = {
      Username: email,
      Password: password,
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

    const cognitoidentityserviceprovider =
      new AWS.CognitoIdentityServiceProvider({
        apiVersion: "2016-04-18",
      });

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

    const cognitoidentityserviceprovider =
      new AWS.CognitoIdentityServiceProvider({
        apiVersion: "2016-04-18",
      });

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
 * Create new user
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
export const CognitoService = {
  signUpCognitoHandler,
  confirmSignUpCognitoHandler,
  signInCognitoHandler,
  addUserToGroupCognitoHandler,
};
