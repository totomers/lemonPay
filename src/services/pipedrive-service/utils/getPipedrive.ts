import { CONFIG } from 'src/config';
var pipedrive = require('pipedrive');
export function getPipeDrive() {
  const defaultClient = pipedrive.ApiClient.instance;

  // Configure API key authorization: apiToken
  let apiToken = defaultClient.authentications.api_key;
  apiToken.apiKey = CONFIG.PIPEDRIVE.TOKEN;

  return pipedrive;
}
