import mongoose from 'mongoose';
import { MongoCustomError } from 'src/utils/customError';
mongoose.Promise = global.Promise;
let isConnected;

export const connectToDatabase = () => {
  if (isConnected) {
    return Promise.resolve();
  }
  const DB_URL =
    process.env.STAGE === 'prod'
      ? process.env.DB_URL_PROD
      : process.env.DB_URL_DEV;

  return mongoose
    .connect(DB_URL)
    .then((db) => {
      isConnected = db.connections[0].readyState;
    })
    .catch((err) => {
      throw new MongoCustomError(err);
    });
};
