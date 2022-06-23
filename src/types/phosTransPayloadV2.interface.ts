export interface IPhosTransPayloadV2 {
  instance: string;
  affiliate: string;
  terminalToken: string;
  midToken: string;
  storeToken: string;
  merchantToken: string;
  userEmail: string;
  userToken: string;
  deviceId: string;
  transactionToken: string;
  transactionType: 'sale' | 'refund' | 'void';
  tid: string;
  mid: string;
  originalTransactionToken: string;
  amount: number;
  tip: number;
  currency: 'EUR';
  authorizationCode: string;
  stan: string;
  rrn: string;
  transactionTime: string;
  transactionTimeUTC: string;
  cardNumber: string;
  cardType: 'Visa' | 'Mastercard';
  status: number;
  scaType: number;
  responseCode: string;
  latitude: string;
  longitude: string;
  metadata: {
    uid: string;
    bid: string;
  };
}
