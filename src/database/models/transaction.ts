import mongoose from 'mongoose';
import { ITransactionDocument } from 'src/types/transaction.interface';

const TransactionSchema = new mongoose.Schema(
  {
    businessId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    phosTerminalToken: { type: String, required: true }, // "16P12022",
    phosMerchantToken: { type: String, required: true }, // "1602011247",
    phosUserToken: { type: String, required: true }, // a@a.a,
    transactionType: { type: String, enum: ['sale', 'refund', 'void'] }, // "sale",
    phosTransactionToken: { type: String, required: true }, //"123",
    amount: { type: Number, required: true }, //"1.23",
    tip: { type: Number },
    responseCode: { type: String }, // "00",
    originalTransactionToken: { type: String }, // "sodsd123",
    transactionNumber: { type: String, required: true }, // 'fd1cdab34e813acfeca0a86924b2dc6f'
    cardNumber: { type: String, required: true }, // '516895XXXXXX5807';
    cardType: { type: String, enum: ['Visa', 'Mastercard'] }, // 'Visa';
    status: { type: String, enum: ['-1', '0', '1'], required: true }, // successful | pending | declined
    instance: { type: String },
    affiliate: { type: String },
    midToken: { type: String },
    storeToken: { type: String },
    userEmail: { type: String },
    deviceId: { type: String },
    tid: { type: String }, //??
    mid: { type: String }, //??
    currency: 'EUR',
    authorizationCode: { type: String },
    stan: { type: String },
    rrn: { type: String },
    transactionTime: { type: Date },
    transactionTimeUTC: { type: Date },
    scaType: { type: Number },
    latitude: { type: String },
    longitude: { type: String },
  },
  { timestamps: true }
);

export const Transaction =
  mongoose.models.transactions ||
  mongoose.model<ITransactionDocument>(
    'transaction',
    TransactionSchema,
    'transactions'
  );
