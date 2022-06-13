import { connectToDatabase } from 'src/database/db';
import https from 'https';
import { Business } from 'src/database/models/business';
import { CONFIG } from 'src/config';
import axios from 'axios';

export async function autocompleteHandler(params: { name: string }) {
  try {
    const { name } = params;
    const kvkUrl = `https://developers.kvk.nl/test/api/v1/zoeken?handelsnaam=${name}&pagina=1&aantal=50`;
    const kvkToken = CONFIG.KVK.TOKEN;

    const results = await axios.get(kvkUrl);
    console.log(results);

    return results.data;
  } catch (error) {
    return error;
  }
}
