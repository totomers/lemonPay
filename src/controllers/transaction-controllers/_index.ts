import { emailReceipt } from './emailReceipt.controller';
import { addTransaction } from './addTransaction.controller';
import { getBusinessTransactionsHistory } from './getBusinessTransactionsHistory.controller';
import { getUserTransactionsHistory } from './getUserTransactionsHistory.controller';
import { createMockTransactions } from './createMockTransactions.controller';
import { createPhosToken } from './createPhosToken.controller';
import { validatePhosToken } from './validatePhosToken.controller';

export const TransactionController = {
  emailReceipt,
  addTransaction,
  getBusinessTransactionsHistory,
  getUserTransactionsHistory,
  createPhosToken,
  validatePhosToken,
  createMockTransactions,
};
