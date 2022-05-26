import { customAlphabet } from 'nanoid';

export const generateRefCode = (): string => {
  const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 8);
  const referralCode = nanoid();

  return referralCode;
};
