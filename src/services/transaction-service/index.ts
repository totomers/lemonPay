import { createTransactionHandler } from './handlers/createTransaction.handler';
import { getBusinessTransactionsHistoryHandler } from './handlers/getBusinessTransactionHistory.handler';
import { emailReceiptHandler } from './handlers/emaiReceipt.handler';
import { createPhosTokenHandler } from './handlers/createPhosToken.handler';
import { validatePhosTokenHandler } from './handlers/validatePhosToken.handler';
import { saveTransactionHandler } from './handlers/saveTransaction.handler';
import { createMockTransactionsHandler } from './handlers/createMockTransactions.handler';
import { getUserTransactionsHistoryHandler } from './handlers/getUserTransactionHistory.handler';

export const TransactionService = {
  createTransactionHandler,
  getBusinessTransactionsHistoryHandler,
  emailReceiptHandler,
  createPhosTokenHandler,
  validatePhosTokenHandler,
  saveTransactionHandler,
  createMockTransactionsHandler,
  getUserTransactionsHistoryHandler,
};
