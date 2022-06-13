import { connectToDatabase } from 'src/database/db';
import https from 'https';
import { Business } from 'src/database/models/business';
import { CONFIG } from 'src/config';

export async function autocompleteHandler(params: { name: string }) {
  try {
    const { name } = params;
    const kvkUrl = `https://developers.kvk.nl/test/api/v1/zoeken?handelsnaam=${name}&pagina=1&aantal=50`;
    const kvkToken = CONFIG.KVK.TOKEN;
    const options = {
      hostname: kvkUrl,
      port: 443,
      //   path: '/todos',
      method: 'GET',
      headers: {
        Authorization: ` Bearer ${kvkToken}`,
      },
    };

    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`);

      res.on('data', (d) => {
        console.log('data received', d);
        process.stdout.write(d);
      });
    });

    req.on('error', (error) => {
      console.error(error);
    });

    req.end();
  } catch (error) {
    return error;
  }
}
