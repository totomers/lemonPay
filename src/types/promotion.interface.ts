import mongoose from 'mongoose';

export type IPromotionDocument = mongoose.Document & {
  businessId: mongoose.Types.ObjectId | string;
  type: PromoTypes;
  status: 'open' | 'pending' | 'closed';
  businessReferred?: mongoose.Types.ObjectId | string;
  referredBy?: mongoose.Types.ObjectId | string;
};

export type PromoTypes = 'referredABusiness' | 'referredByBusiness';
