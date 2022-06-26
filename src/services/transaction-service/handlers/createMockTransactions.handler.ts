import { connectToDatabase } from 'src/database/db';
import { Business } from 'src/database/models/business';
import { Transaction } from 'src/database/models/transaction';
import { User } from 'src/database/models/user';
import { MongoCustomError } from 'src/utils/customError';
import { randomIntFromInterval } from 'src/utils/tests/randomIntFromInterval';
/**
 * ====================================================================================================
 * Save transaction in DB.
 * @param params
 * ====================================================================================================
 */
export async function createMockTransactionsHandler() {
  try {
    await connectToDatabase();
    const mockTransactions = await _generateMockTransactions();

    const result = await Transaction.collection.insertMany(mockTransactions);

    return result;
  } catch (err) {
    console.log('Oh no an error has occured: ', err);
    throw new MongoCustomError(err);
  }
}

async function _generateMockTransactions() {
  const businesses = await Business.find();
  const users = await User.find();

  console.log(businesses);
  console.log(users);

  const businessIds = businesses.map((b) => b._id);
  const userIds = users.map((u) => u._id);

  const amountOfTransactions = 200;
  const mockTransactions = Array.from(
    Array(amountOfTransactions).keys()
  ) as any[];

  const result = mockTransactions.map(() => {
    const amount = randomIntFromInterval(1, 100);
    const businessId =
      businessIds[randomIntFromInterval(0, businessIds.length)];
    const userId = userIds[randomIntFromInterval(0, userIds.length)];
    return { ...mockTransaction, amount, businessId, userId };
  });
  return result;
}

const mockTransaction = {
  instance: 'instance1',
  affiliate: 'affiliate1',
  terminalToken: 'fd1cdab34e813acfeca0a86924b2dc22',
  midToken: '423c9b6c1969480bc12c74bc0962a89c',
  storeToken: '423c9b6c1969480bc12c74bc0962a89c',
  merchantToken: '60cd19bfaffd27d64bd108f06001bf6e',
  userEmail: 'a@a.a',
  userToken: 'a9bab96cb02095824481e7e1971542e3',
  deviceId: 'af33b09dcf952e7d',
  transactionToken: '0be71afd0bb8ed645251b1ab80b78914',
  transactionType: 'sale',
  tid: '16P12022',
  mid: '1602011247',
  originalTransactionToken: '61e7cc07e60bca6cd5448bc0a4de459b',
  tip: 0.5,
  currency: 'EUR',
  authorizationCode: '078206',
  stan: '000057',
  rrn: '99620d9b6fb0',
  transactionTime: '2021-11-30 11:27:55',
  transactionTimeUTC: '2021-11-30 09:27:55',
  cardNumber: '516895XXXXXX5807',
  cardType: 'Visa',
  status: 1,
  scaType: 1,
  responseCode: '00',
  latitude: '13.123',
  longitude: '13.123',
};
