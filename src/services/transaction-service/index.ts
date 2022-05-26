import { createTransactionHandler } from './handlers/createTransaction.handler';
import { getTransactionHistoryHandler } from './handlers/getTransactionHistory.handler';
import { emailReceiptHandler } from './handlers/emaiReceipt.handler';
import { createPhosTokenHandler } from './handlers/createPhosToken.handler';
import { validatePhosTokenHandler } from './handlers/validatePhosToken.handler';
export const TransactionService = {
  createTransactionHandler,
  getTransactionHistoryHandler,
  emailReceiptHandler,
  createPhosTokenHandler,
  validatePhosTokenHandler,
};
