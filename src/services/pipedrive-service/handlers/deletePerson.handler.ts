import { getPipeDrive } from '../utils/getPipedrive';

export interface DeletePersonRequest {
  id: number;
}
export interface DeletePersonResponse {
  success: boolean;
  data: { id: number };
}

export async function deletePersonHandler(
  params: DeletePersonRequest
): Promise<DeletePersonResponse> {
  try {
    const { id } = params;
    const Pipedrive = getPipeDrive();
    const PersonsApi = new Pipedrive.PersonsApi();
    const result = await PersonsApi.deletePerson({
      id,
    });

    return result;
  } catch (err) {
    console.log(err);

    throw err;
  }
}
