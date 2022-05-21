import mongoose from 'mongoose';
import { ICurrencyCodes } from './currencyCodes.interace';
import { ITransactionStatus } from './transactionStatus.interface';

export type ITransactionDocument = mongoose.Document & {
  businessId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  phosTerminalIdentifier: string; // "16P12022",
  phosMerchantIdentifier: string; // "1602011247",
  phosUserIdentifier: string; // a@a.a,
  transactionType: 'sale' | 'refund' | 'void'; // "sale",
  phosTransactionId: string; //"123",
  approvedAmount: string; //"1.23",
  approvalNumber: number; // "078206",
  approvalTime: string; //"2021-11-30 09:27:55",
  responseCode?: string; // "00",
  origTransactionId?: string;
  batchNumber: number; // 0,
  transactionNumber: string; // 'fd1cdab34e813acfeca0a86924b2dc6f'
  cardNumber: string; // '516895XXXXXX5807';
  cardType: 'Visa' | 'Mastercard'; // 'Visa';
  status: '-1' | '0' | '1'; // successful | pending | declined
};
