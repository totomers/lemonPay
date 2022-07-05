import { CONFIG } from 'src/config';
import jwt from 'jsonwebtoken';
import { InvalidPhosTokenOrKeyError } from 'src/utils/Errors';
export async function validatePhosTokenHandler(params: {
  token: string;
  preSharedPhosKey: string;
}): Promise<{ 'user-id': string }> {
  try {
    const { token, preSharedPhosKey } = params;
    const phosTokenGenSecret = CONFIG.PHOS.TOKEN_GEN_SECRET;
    const phosSecret = CONFIG.PHOS.PRE_SHARED_SECRET;

    if (phosSecret !== preSharedPhosKey) throw new Error();

    jwt.verify(token, phosTokenGenSecret);
    const decodedToken = jwt.decode(token) as { email: string; userId: string };

    const userId = decodedToken.userId;

    return { 'user-id': userId };
  } catch (error) {
    throw new InvalidPhosTokenOrKeyError();
  }
}
