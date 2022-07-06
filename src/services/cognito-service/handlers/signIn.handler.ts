import { CONFIG } from 'src/config';
import { EmailService } from 'src/services/email-service';
import { AWSCognitoError } from 'src/utils/Errors';
import { CognitoService } from '..';
import { clientId, cognitoidentityserviceprovider } from '../common';

/**
 * =======================================================================================================
 * Sign in existing user
 * @param params
 * =======================================================================================================
 */

export async function signInCognitoHandler(params: {
  email: string;
  password: string;
}): Promise<{
  session: string;
}> {
  try {
    const { email, password } = params;
    // const msg = {
    //   to: 'tomere@moveo.co.il', // Change to your recipient
    //   from: 'test@example.com', // Change to your verified sender
    //   subject: 'Sending with SendGrid is Fun',
    //   text: 'and easy to do anywhere, even with Node.js',
    //   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    // };
    // await EmailService.sendEmailHandler(msg);
    await cognitoidentityserviceprovider
      .initiateAuth({
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: clientId,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      })
      .promise();

    const data = await CognitoService.initiateCustomAuthHandler({
      email,
      currentAuthChallenge: 'LOGIN',
    });

    return { session: data.session };
  } catch (err) {
    throw new AWSCognitoError(err);
  }
}
