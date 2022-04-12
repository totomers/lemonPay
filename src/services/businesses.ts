import { Model } from "mongoose";
import { IBusinessDocument } from "src/types/business.interface";
import { connectToDatabase } from "src/db";
export class BusinessesService {
  private businesses: Model<any>;
  constructor(businesses: Model<any>) {
    this.businesses = businesses;
  }

  /**
   * Create business
   * @param params
   */

  protected async createBusinessService(
    params: Partial<IBusinessDocument>
  ): Promise<object> {
    try {
      console.log("Reached server & trying to connect to database");

      await connectToDatabase();
      const result = await this.businesses.create({
        name: params.name,
        trade_name: params.trade_name,
        legal_type: params.legal_type,
        industry: params.industry,
        address: params.address,
        merchant_id: params.merchant_id,
        bank_account_name: params.bank_account_name,
        IBAN: params.IBAN,
        BIC: params.BIC,
      });

      return result;
    } catch (err) {
      console.error(err);

      throw err;
    }
  }

  /**
   * Get businesses
   */
  protected async getAllBusinesses() {
    await connectToDatabase();
    console.log("trying to get all from service..");

    return this.businesses.find();
  }

  // /**
  //  * Update a business by id
  //  * @param _id
  //  * @param update
  //  */
  // protected updateBusiness(_id: number, update: object) {
  //   return this.businesses.findOneAndUpdate(
  //     { _id },
  //     { $set: update },
  //     { new: true }
  //   );
  // }

  // /**
  //  * Query business by id
  //  * @param _id
  //  */
  // protected getOneBusinessById(_id: string) {
  //   return this.businesses.findOne({ _id });
  // }

  // /**
  //  * Delete business by id
  //  * @param id
  //  */
  // protected deleteOneBusinessById(_id: string) {
  //   return this.businesses.deleteOne({ _id });
  // }
}
