export interface IPhosOnboardingResponse {
  code: number;
  data: {
    merchantToken: string;
    userToken: string;
    storeToken: string;
    terminalToken: string;
  };
}
