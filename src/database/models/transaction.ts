import mongoose from 'mongoose';
import { ITransactionDocument } from 'src/types/transaction.interface';

const TransactionSchema = new mongoose.Schema(
  {
    businessId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    phosTerminalIdentifier: { type: String, required: true }, // "16P12022",
    phosMerchantIdentifier: { type: String, required: true }, // "1602011247",
    phosUserIdentifier: { type: String, required: true }, // a@a.a,
    transactionType: { type: String, enum: ['sale', 'refund', 'void'] }, // "sale",
    phosTransactionId: { type: String, required: true }, //"123",
    approvedAmount: { type: String, required: true }, //"1.23",
    approvalNumber: { type: Number, required: true }, // "078206",
    approvalTime: { type: String, required: true }, //"2021-11-30 09:27:55",
    responseCode: { type: String }, // "00",
    origTransactionId: { type: String }, // "sodsd123",
    batchNumber: { type: Number, required: true }, // 0,
    transactionNumber: { type: String, required: true }, // 'fd1cdab34e813acfeca0a86924b2dc6f'
    cardNumber: { type: String, required: true }, // '516895XXXXXX5807';
    cardType: { type: String, enum: ['Visa', 'Mastercard'] }, // 'Visa';
    status: { type: String, enum: ['-1', '0', '1'], required: true }, // successful | pending | declined

    // amount: {
    //   type: Number,
    //   required: true,
    // },
    // currency: {
    //   type: String,
    //   enum: ['EUR'],
    //   required: true,
    // },
    // status: {
    //   type: String,
    //   enum: ['PENDING', 'FAILED', 'CHARGED', 'CANCELED'],
    //   required: true,
    // },
  },
  { timestamps: true }
);

// Note: OverwriteModelError: Cannot overwrite `Books` model once compiled. error
export const Transaction =
  mongoose.models.transactions ||
  mongoose.model<ITransactionDocument>(
    'transaction',
    TransactionSchema,
    'transactions'
  );
