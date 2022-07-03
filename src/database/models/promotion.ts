import mongoose from 'mongoose';
import { IPromotionDocument } from 'src/types/promotion.interface';

const PromotionSchema = new mongoose.Schema(
  {
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'business' },
    type: {
      type: String,
      enum: ['referredABusiness', 'referredByBusiness'],
      required: true,
    },
    status: {
      type: String,
      enum: ['open', 'pending', 'closed'],
      default: 'open',
      required: true,
    },
    businessReferred: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'business',
      default: '',
    },
    referredBy: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Promotion =
  mongoose.models.promotions ||
  mongoose.model<IPromotionDocument>(
    'promotion',
    PromotionSchema,
    'promotions'
  );
