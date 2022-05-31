import { connectToDatabase } from 'src/database/db';
import { Business } from 'src/database/models/business';

export async function getAllBusinessesHandler() {
  try {
    await connectToDatabase();
    return await Business.find();
  } catch (error) {
    return error;
  }
}
