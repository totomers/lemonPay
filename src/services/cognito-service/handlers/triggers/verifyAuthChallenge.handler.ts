import { VerifyAuthChallengeResponseTriggerEvent } from 'aws-lambda';

/**
 * =======================================================================================================
 *  Verify Auth Challange Handler To Send OTP For User Auth.
 * @param params
 * =======================================================================================================
 */

export async function verifyAuthChallengeHandler(params: {
  event: VerifyAuthChallengeResponseTriggerEvent;
}): Promise<VerifyAuthChallengeResponseTriggerEvent> {
  try {
    const { event } = params;

    const expectedAnswer =
      event.request.privateChallengeParameters.secretLoginCode;

    if (
      event.request.challengeAnswer === expectedAnswer ||
      (process.env.STAGE === 'DEV' &&
        event.request.challengeAnswer ===
          process.env.FAKE_CONFIRMATION_CODE_DEV_TESTING)
    ) {
      event.response.answerCorrect = true;
    } else {
      event.response.answerCorrect = false;
    }

    return event;
  } catch (err) {
    console.log('Error verifying the code: ', err);

    throw err;
  }
}
