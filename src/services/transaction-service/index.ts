import { createTransactionHandler } from './handlers/createTransaction.handler';
import { getTransactionHistoryHandler } from './handlers/getTransactionHistory.handler';
import { emailReceiptHandler } from './handlers/emaiReceipt.handler';
import { createPhosTokenHandler } from './handlers/createPhosToken.handler';
import { validatePhosTokenHandler } from './handlers/validatePhosToken.handler';
import { saveTransactionHandler } from './handlers/saveTransaction.handler';
import { createMockTransactionsHandler } from './handlers/createMockTransactions.handler';

export const TransactionService = {
  createTransactionHandler,
  getTransactionHistoryHandler,
  emailReceiptHandler,
  createPhosTokenHandler,
  validatePhosTokenHandler,
  saveTransactionHandler,
  createMockTransactionsHandler,
};
