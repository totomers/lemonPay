/**
 * =======================================================================================================
 *  Defining Auth Challange Handler To Send OTP For User Auth.
 * @param params
 * =======================================================================================================
 */

import { DefineAuthChallengeTriggerEvent } from 'aws-lambda';

export async function defineAuthChallengeHandler(params: {
  event: DefineAuthChallengeTriggerEvent;
}): Promise<DefineAuthChallengeTriggerEvent> {
  try {
    const { event } = params;
    console.log('event sessions: ', event.request.session);
    console.log('event sessions amount: ', event.request.session.length);

    // If user is not registered
    if (event.request.userNotFound) {
      event.response.issueTokens = false;
      event.response.failAuthentication = true;

      // throw new Error('User does not exist');
    }

    if (
      event.request.session.length > 3 &&
      event.request.session.slice(-1)[0].challengeResult === false
    ) {
      // wrong OTP even After 3 sessions?
      event.response.issueTokens = false;
      event.response.failAuthentication = true;
      // throw new CustomError('Invalid OTP', 500, 'MaxAttemptsException');
    } else if (
      event.request.session.length > 0 &&
      event.request.session.slice(-1)[0].challengeResult === true
    ) {
      // Correct OTP!
      event.response.issueTokens = true;
      event.response.failAuthentication = false;
    } else {
      // not yet received correct OTP
      event.response.issueTokens = false;
      event.response.failAuthentication = false;
      event.response.challengeName = 'CUSTOM_CHALLENGE';
      console.log('Token was not yet correct, Continue challenging the user.');

      // throw new CustomError(
      //   'Confirmation Code is not correct',
      //   400,
      //   'CodeMismatchException',
      //   'A'
      // );
    }

    return event;
  } catch (err) {
    throw err;
  }
}
