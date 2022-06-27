import { emailReceipt } from './emailReceipt.controller';
import { addTransaction } from './addTransaction.controller';
import { getTransactionHistory } from './getTransactionHistory.controller';
import { createMockTransactions } from './createMockTransactions.controller';
import { createPhosToken } from './createPhosToken.controller';
import { validatePhosToken } from './validatePhosToken.controller';

export const TransactionController = {
  emailReceipt,
  addTransaction,
  getTransactionHistory,
  createPhosToken,
  validatePhosToken,
  createMockTransactions,
};
