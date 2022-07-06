import { getPipeDrive } from '../utils/getPipedrive';

export interface DeleteDealRequest {
  id: number;
}
export interface DeletePersonResponse {
  success: boolean;
  data: { id: number };
}

export async function deletePersonHandler(
  params: DeleteDealRequest
): Promise<DeletePersonResponse> {
  try {
    const { id } = params;
    const Pipedrive = getPipeDrive();
    const DealApi = new Pipedrive.DealApi();
    const result = await DealApi.deletePerson({
      id,
    });

    return result;
  } catch (err) {
    console.log(err);

    throw err;
  }
}
