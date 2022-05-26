import { CreateAuthChallengeTriggerEvent } from 'aws-lambda';
import { EmailService } from 'src/services/email-service';

/**
 * =======================================================================================================
 *  Creating Auth Challange Handler To Send OTP For User Auth.
 * @param params
 * =======================================================================================================
 */

export async function createAuthChallengeHandler(params: {
  event: CreateAuthChallengeTriggerEvent;
}): Promise<CreateAuthChallengeTriggerEvent> {
  try {
    const { event } = params;
    let secretLoginCode;
    console.log('session:', event.request.session);
    console.log(event);

    if (!event.request.session || !event.request.session.length) {
      // Generate a new secret login code and send it to the user
      secretLoginCode = Date.now().toString().slice(-6);
      console.log('OTP / Secret Password Reset Code: ' + secretLoginCode);
      try {
        const html = `<html><body><p>This is your secret password reset code:</p>
          <h3>${secretLoginCode}</h3></body></html>`;
        const text = `Your secret password reset code: ${secretLoginCode}`;
        const subject = 'Your secret password reset code';
        const to = event.request.userAttributes.email;

        const emailResult = await EmailService.sendEmailHandler({
          text,
          subject,
          to,
          html,
        });

        console.log(emailResult);
      } catch (error) {
        // Handle SMS Failure
        console.log(error);
      }
    } else {
      // re-use code generated in previous challenge
      const previousChallenge = event.request.session.slice(-1)[0];
      secretLoginCode =
        previousChallenge.challengeMetadata.match(/CODE-(\d*)/)[1];
    }

    console.log(event.request.userAttributes);

    // Add the secret login code to the private challenge parameters
    // so it can be verified by the "Verify Auth Challenge Response" trigger
    event.response.privateChallengeParameters = { secretLoginCode };

    // Add the secret login code to the session so it is available
    // in a next invocation of the "Create Auth Challenge" trigger
    event.response.challengeMetadata = `CODE-${secretLoginCode}`;

    return event;
  } catch (err) {
    console.log('Error creating the auth: ', err);
    throw err;
  }
}
