import mongoose from 'mongoose';
import { ITransactionDocument } from 'src/types/transaction.interface';

const TransactionSchema = new mongoose.Schema(
  {
    businessId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ['EUR'],
      required: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'FAILED', 'CHARGED', 'CANCELED'],
      required: true,
    },
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
