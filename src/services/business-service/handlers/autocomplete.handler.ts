import { connectToDatabase } from 'src/database/db';
import https from 'https';
import { Business } from 'src/database/models/business';
import { CONFIG } from 'src/config';
import axios from 'axios';
import {
  kvkSearchResults,
  kvkSearchResultsEnglish,
  kvkBusinessItemEnglish,
  kvkBusinessItem,
} from 'src/types/kvkSearchResults.interface';
import aws from 'aws-sdk';
import fs from 'fs';
export async function autocompleteHandler(params: { name: string }) {
  try {
    const { name } = params;
    const kvkToken = CONFIG.KVK.TOKEN;
    console.log('name', name);

    const SSM = new aws.SSM({
      apiVersion: '2016-04-18',
    });

    const GetParamRequest: aws.SSM.GetParameterRequest = {
      Name: 'kvk_autocomplete_pem',
      WithDecryption: true,
    };

    const kvk_autocomplete_pem = await SSM.getParameter(
      GetParamRequest
    ).promise();

    const resultsPerPage = 100;
    const kvkTestUrl = `https://developers.kvk.nl/test/api/v1/zoeken?handelsnaam=${name}&pagina=1&aantal=50`;
    const kvkUrl = `https://api.kvk.nl/api/v1/zoeken?handelsnaam=${name}&pagina=1&aantal=${resultsPerPage}&user_key=${kvkToken}`;
    console.log('env:', kvk_autocomplete_pem);

    const httpsAgent = new https.Agent({
      rejectUnauthorized: true,
      ca: kvk_autocomplete_pem.Parameter.Value,
    });

    const results = await axios.get(kvkUrl, { httpsAgent });
    const kvkSearchResults = results.data as kvkSearchResults;
    const kvkSearchResultsEnglish = _mapObjectDutchToEnglish(kvkSearchResults);

    return kvkSearchResultsEnglish;
  } catch (error) {
    console.log(error);

    return error;
  }
}

function _mapObjectDutchToEnglish(obj: kvkSearchResults) {
  const mappedObj = {} as kvkSearchResultsEnglish;
  mappedObj.page = obj.pagina;
  mappedObj.amountPerPage = obj.aantal;
  mappedObj.total = obj.totaal;
  mappedObj.previous = obj.vorige;
  mappedObj.next = obj.volgende;
  mappedObj.results = obj.resultaten.map((b: kvkBusinessItem) => {
    const mappedBus = {} as kvkBusinessItemEnglish;
    mappedBus.kvkNumber = b.kvkNummer;
    mappedBus.tradeName = b.handelsnaam;
    mappedBus.rsin = b.rsin;
    mappedBus.streetName = b.straatnaam;
    mappedBus.houseNumber = b.huisnummer;
    mappedBus.zipcode = b.postcode;
    mappedBus.locationNumber = b.vestigingsnummer;
    mappedBus.place = b.plaats;
    mappedBus.active = b.actief;

    return mappedBus;
  });

  return mappedObj;
}
