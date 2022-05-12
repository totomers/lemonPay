export interface IClaimsIdToken {
  'custom:isInitiated': '0' | '1';
  'custom:isKnownDetails': '0' | '1';
  'custom:isVerified': '0' | '1';
  'custom:isPasswordMutable': '0' | '1';
  name: string;
  email: string;
  'cognito:groups': ['unverified' | 'verified'];
  'cognito:roles': string[];
  email_verified: 'true' | 'false';
  auth_time: string;
  exp: string;
  iat: string;
}
