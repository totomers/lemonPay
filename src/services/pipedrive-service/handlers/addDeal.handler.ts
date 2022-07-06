import { getPipeDrive } from '../utils/getPipedrive';

export interface AddDealRequest {
  title: string;
  value?: string;
  currency?: string;
  user_id?: number;
  person_id?: number;
  org_id?: number;
  pipeline_id?: number;
  stage_id?: number;
  status?: 'open' | 'lost' | 'won' | 'deleted';
  add_time?: string; //Format: YYYY-MM-DD HH:MM:SS
}

export async function addDealHandler(params: AddDealRequest) {
  try {
    const Pipedrive = getPipeDrive();
    const DealsApi = new Pipedrive.DealsApi();
    const result = await DealsApi.addDeal(params);
    return result;
  } catch (err) {
    console.log(err);

    throw err;
  }
}
