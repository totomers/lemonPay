import { connectToDatabase } from 'src/database/db';
import { Business } from 'src/database/models/business';

export async function getBusinessDetailsHandler(params: { _id: string }) {
  try {
    await connectToDatabase();
    const { _id } = params;
    const business = await Business.findById(_id);

    return business;
  } catch (error) {
    return error;
  }
}
