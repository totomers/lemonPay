import { connectToDatabase } from 'src/database/db';
import { Business } from 'src/database/models/business';

export async function getBusinessDetailsHandler(params: { _id: string }) {
  try {
    await connectToDatabase();
    const { _id } = params;
    const business = await Business.findById(_id)
      .select({
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      })
      .populate({
        path: 'rootUser',
        model: 'user',
        select: { createdAt: 0, updatedAt: 0, __v: 0, businesses: 0 },
      });

    return business;
  } catch (error) {
    return error;
  }
}
