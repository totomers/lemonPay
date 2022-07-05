import { addPromotionHandler } from './handlers/addPromotion.handler';
import { updatePromotionsStatusHandler } from './handlers/updatePromotionsStatus.handler';
import { redeemCodeHandler } from './handlers/redeemCode.handler';

export const PromotionService = {
  addPromotionHandler,
  updatePromotionsStatusHandler,
  redeemCodeHandler,
};
