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

// export class BusinessService {
//   private businesses: Model<any>;
//   constructor(businesses: Model<any>) {
//     this.businesses = businesses;
//   }

//   /**
//    * Create business
//    * @param params
//    */

//   protected async createBusiness(
//     params: Partial<IBusinessDocument>
//   ): Promise<IBusinessDocument> {
//     try {
//       console.log("Reached server & trying to connect to database");

//       await connectToDatabase();
//       const result = await this.businesses.create({
//         name: params.name,
//         trade_name: params.trade_name,
//         legal_type: params.legal_type,
//         industry: params.industry,
//         address: params.address,
//         merchant_id: params.merchant_id,
//         bank_account_name: params.bank_account_name,
//         IBAN: params.IBAN,
//         BIC: params.BIC,
//       });

//       return result;
//     } catch (err) {
//       console.error(err);

//       throw err;
//     }
//   }

//   /**
//    * Get businesses
//    */
//   protected async getAllBusinesses() {
//     try {
//       console.log("trying to get all from service..");

//       await connectToDatabase();

//       return this.businesses.find();
//     } catch (error) {
//       console.log("Business Service Error: ", error);
//     }
//   }

//   // /**
//   //  * Update a business by id
//   //  * @param _id
//   //  * @param update
//   //  */
//   // protected updateBusiness(_id: number, update: object) {
//   //   return this.businesses.findOneAndUpdate(
//   //     { _id },
//   //     { $set: update },
//   //     { new: true }
//   //   );
//   // }

//   // /**
//   //  * Query business by id
//   //  * @param _id
//   //  */
//   // protected getOneBusinessById(_id: string) {
//   //   return this.businesses.findOne({ _id });
//   // }

//   // /**
//   //  * Delete business by id
//   //  * @param id
//   //  */
//   // protected deleteOneBusinessById(_id: string) {
//   //   return this.businesses.deleteOne({ _id });
//   // }
// }
