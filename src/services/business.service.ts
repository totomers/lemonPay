import { Model } from "mongoose";
import { IBusinessDocument } from "src/types/business.interface";
import { connectToDatabase } from "src/database/db";
import { Business } from "../database/models/business";

export async function getAllBusinessesHandler() {
  try {
    await connectToDatabase();
    return Business.find();
  } catch (error) {
    console.log("Business Service Error: ", error);
    return error;
  }
}

export async function createBusinessHandler(
  params: Partial<IBusinessDocument>
): Promise<IBusinessDocument> {
  try {
    console.log("Reached server & trying to connect to database");
    await connectToDatabase();
    const result = await Business.create(params);

    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const BusinessService = {
  getAllBusinessesHandler,
  createBusinessHandler,
};
