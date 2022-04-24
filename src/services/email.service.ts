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

export async function sendEmailAfterTransaction(params: {
  name: string;
  email: string;
}): Promise<{} | AWS.AWSError> {
  try {
    // await connectToDatabase();
    const { email, name } = params;

    await { email };

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

export const CognitoService = {
  sendEmailAfterTransaction,
};
