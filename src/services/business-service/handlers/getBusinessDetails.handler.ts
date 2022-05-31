import { connectToDatabase } from 'src/database/db';
import { Business } from 'src/database/models/business';

export async function getBusinessDetailsHandler(params: { _id: string }) {
  try {
    await connectToDatabase();
    const { _id } = params;
    return await Business.findById(_id);
  } catch (error) {
    return error;
  }
}
