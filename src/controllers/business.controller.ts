import { Context } from "aws-lambda";
import { Model } from "mongoose";
import { MessageUtil } from "../utils/message";
import { BusinessesService } from "../services/businesses";
import { IBusinessDocument } from "src/types/business.interface";

export class BusinessesController extends BusinessesService {
  constructor(businesses: Model<any>) {
    super(businesses);
  }

  /**
   * Get business list
   */
  async getAll(event?: any, context?: Context) {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
      const result = await this.getAllBusinesses();
      return result;
    } catch (err) {
      console.error(err);
      console.log("error:", err);
      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Create business
   * @param {*} event
   */
  async create(event: any, context?: Context) {
    console.log("functionName", context.functionName);
    try {
      context.callbackWaitsForEmptyEventLoop = false;

      const params: Partial<IBusinessDocument> = event?.body;
      console.log("params", params);

      const result = await this.createBusinessService({
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

      return MessageUtil.error(err.code, err.message);
    }
  }

  //   /**
  //    * Update a business by id
  //    * @param event
  //    */
  //   async update(event: any) {
  //     const _id: number = Number(event.pathParameters._id);
  //     const body: object = JSON.parse(event.body);

  //     try {
  //       const result = await this.updateBusiness(_id, body);
  //       return MessageUtil.success(result);
  //     } catch (err) {
  //       console.error(err);

  //       return MessageUtil.error(err.code, err.message);
  //     }
  //   }

  //   /**
  //    * Get business by id
  //    * @param event
  //    */
  //   async findOne(event: any, context: Context) {
  //     // The amount of memory allocated for the function
  //     console.log("memoryLimitInMB: ", context.memoryLimitInMB);

  //     const _id: string = event.pathParameters._id;

  //     try {
  //       const result = await this.getOneBusinessById(_id);

  //       return MessageUtil.success(result);
  //     } catch (err) {
  //       console.error(err);

  //       return MessageUtil.error(err.code, err.message);
  //     }
  //   }

  //   /**
  //    * Delete business by id
  //    * @param event
  //    */
  //   async deleteOne(event: any) {
  //     const _id: string = event.pathParameters.id;

  //     try {
  //       const result = await this.deleteOneBusinessById(_id);

  //       if (result.deletedCount === 0) {
  //         return MessageUtil.error(
  //           1010,
  //           "The data was not found! May have been deleted!"
  //         );
  //       }

  //       return MessageUtil.success(result);
  //     } catch (err) {
  //       console.error(err);

  //       return MessageUtil.error(err.code, err.message);
  //     }
  //   }
}
