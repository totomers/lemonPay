export interface IPhosOnboardingRequest {
  merchant: {
    name: string;
    email: string;
    mobile_phone: string;
    country: string;
    city: string;
    address1: string;
    zip: string;
    uic: string;
    currency: 'EUR';
    sca: boolean;
    scaType: number;
  };
  user: {
    email: string;
    plain_password: string;
    generatePassword: boolean;
  };
  store: {
    name: string;
    address: string;
    card_acceptor_identification_code: string;
    card_acceptor_country: string;
    card_acceptor_city: string;
    card_acceptor_name: string;
    merchant_category_code_name: string;
    timezone_name: string;
  };
  terminal: {
    alias: string;
    pos_terminal_id_code: string;
    currency: 'EUR';
  };
}
