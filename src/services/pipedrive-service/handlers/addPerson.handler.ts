import { getPipeDrive } from '../utils/getPipedrive';

export interface AddPersonRequest {
  name: string;
  email: string;
  promoCode: string;
}
export interface AddPersonResponse {
  success: boolean;
  data: { id: number };
}

export async function addPersonHandler(
  params: AddPersonRequest
): Promise<AddPersonResponse> {
  try {
    const { name, email, promoCode } = params;
    const Pipedrive = getPipeDrive();
    const PersonsApi = new Pipedrive.PersonsApi();
    const result = await PersonsApi.addPerson({
      name: name,
      email: email,
      '3d69734b56ff3661ba0480177177020821eb7769': promoCode,
    });

    return result;
  } catch (err) {
    console.log(err);

    throw err;
  }
}


export async function getPersonFields() {
  try {
    const Pipedrive = getPipeDrive();
    const PersonFieldsApi = new Pipedrive.PersonFieldsApi();
    const personFields = await PersonFieldsApi.getPersonFields();

    return personFields;
  } catch (err) {
    console.log(err);

    throw err;
  }
}

/*   NEW PERSON RESPONSE 
{
    "success": true,
    "data": {
        "id": 1104,
        "company_id": 10880561,
        "active_flag": true,
        "phone": [
            {
                "value": "",
                "primary": true
            }
        ],
        "email": [
            {
                "value": "tomer@lemonpay.nl",
                "primary": true,
                "label": ""
            }
        ],
        "first_char": "t",
        "add_time": "2022-07-05 14:07:48",
        "update_time": "2022-07-05 14:07:48",
        "visible_to": "3",
        "label": null,
        "org_name": null,
        "owner_name": "Geus Walder",
        "cc_email": "lemonpay@pipedrivemail.com",
        "owner_id": {
            "id": 14325373,
            "name": "Geus Walder",
            "email": "geus@lemonpay.nl",
            "has_pic": 0,
            "pic_hash": null,
            "active_flag": true,
            "value": 14325373
        },
        "name": "Tomer",
        "first_name": "Tomer",
        "last_name": null,
        "open_deals_count": 0,
        "related_open_deals_count": 0,
        "closed_deals_count": 0,
        "related_closed_deals_count": 0,
        "participant_open_deals_count": 0,
        "participant_closed_deals_count": 0,
        "email_messages_count": 0,
        "activities_count": 0,
        "done_activities_count": 0,
        "undone_activities_count": 0,
        "files_count": 0,
        "notes_count": 0,
        "followers_count": 0,
        "won_deals_count": 0,
        "related_won_deals_count": 0,
        "lost_deals_count": 0,
        "related_lost_deals_count": 0,
        "next_activity_date": null,
        "next_activity_time": null,
        "next_activity_id": null,
        "last_activity_id": null,
        "last_activity_date": null,
        "last_incoming_mail_time": null,
        "last_outgoing_mail_time": null,
        "marketing_status": "no_consent",
        "doi_status": "1",
        "primary_email": "tomer@lemonpay.nl",
        "a2a9276f1b015f2fe1faaff083a903b8b8fbc960": null,
        "42d6fabb3475a5117fc461f8ce4920258ebf06f6": null,
        "cc17844cc440a4769c53fb3583c0716b752ca9ae": null,
        "3d69734b56ff3661ba0480177177020821eb7769": null
    },
    "related_objects": {
        "user": {
            "14325373": {
                "id": 14325373,
                "name": "Geus Walder",
                "email": "geus@lemonpay.nl",
                "has_pic": 0,
                "pic_hash": null,
                "active_flag": true
            }
        }
    }
}


*/
