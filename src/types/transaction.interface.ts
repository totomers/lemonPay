import mongoose from 'mongoose';

export type ITransactionDocument = mongoose.Document & {
  businessId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  phosTerminalToken: string; // "16P12022",
  phosMerchantToken: string; // "1602011247",
  phosUserToken: string; // a@a.a,
  transactionType: 'sale' | 'refund' | 'void'; // "sale",
  phosTransactionToken: string; //"123",
  amount: number; //"1.23",
  tip: number;
  responseCode: string; // "00",
  originalTransactionToken: string; // "sodsd123",
  transactionNumber: string; // 'fd1cdab34e813acfeca0a86924b2dc6f'
  cardNumber: string; // '516895XXXXXX5807';
  cardType: 'Visa' | 'Mastercard'; // 'Visa';
  status: -1 | 0 | 1; // successful | pending | declined
  instance: string;
  affiliate: string;
  midToken: string;
  storeToken: string;
  userEmail: string;
  deviceId: string;
  tid: string; //??
  mid: string; //??
  currency: 'EUR';
  authorizationCode: string;
  stan: string;
  rrn: string;
  transactionTime: string;
  transactionTimeUTC: string;
  scaType: number;
  latitude: string;
  longitude: string;
};
