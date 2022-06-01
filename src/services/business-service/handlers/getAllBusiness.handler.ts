import { connectToDatabase } from 'src/database/db';
import { Business } from 'src/database/models/business';

export async function getAllBusinessesHandler() {
  try {
    await connectToDatabase();
    return await Business.find()
      .select({ _id: 1, businessName: 1, status: 1 })
      .populate({
        path: 'businessAdmin',
        model: 'user',
        select: { email: 1, name: 1 },
      });
  } catch (error) {
    return error;
  }
}
