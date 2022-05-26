import { CONFIG } from 'src/config';
import jwt from 'jsonwebtoken';

export async function createPhosTokenHandler(params: {
  email?: string;
  userId?: string;
}): Promise<{ token: string; issuer?: string }> {
  try {
    const { email, userId } = params;
    const secret = CONFIG.PHOS.TOKEN_GEN_SECRET;
    const token = jwt.sign({ email, userId }, secret, { expiresIn: '5m' });

    // Guy or I need to return with the token the 'issuer': 'phos-client-identifier-to-be-passed-to-the-SDK'
    return { token, issuer: 'phos-client-identifier-to-be-passed-to-the-SDK' };
  } catch (error) {}
}
