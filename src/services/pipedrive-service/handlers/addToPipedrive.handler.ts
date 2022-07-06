import { PipedriveService } from '..';
import { AddPersonRequest } from './addPerson.handler';
import { getPipeDrive } from '../utils/getPipedrive';
import { AddDealRequest } from './addDeal.handler';
import { CONFIG } from 'src/config';

export interface AddToPipedriveRequest extends AddPersonRequest {}

export async function addToPipedriveHandler(params: AddToPipedriveRequest) {
  try {
    const { name, email, promoCode } = params;
    const person = await PipedriveService.addPersonHandler({
      name,
      email,
      promoCode,
    });

    const AddDealConfig = {
      title: name,
      person_id: person.data.id,
      pipeline_id: CONFIG.PIPEDRIVE.PIPELINES.INDIVIDUALS_FREELANCERS.id,
    } as AddDealRequest;

    const deal = await PipedriveService.addDealHandler(AddDealConfig);
    return deal;
  } catch (err) {
    console.log(err);

    return err;
  }
}
